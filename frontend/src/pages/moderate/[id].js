import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ArticleDetailCard from '../../components/ArticleDetails/ArticleDetailCard';
import AuthorCard from '../../components/ArticleDetails/AuthorCard';
import CheckStatusCard from '../../components/ArticleDetails/CheckStatusCard';

function ArticleDetail() {
  const router = useRouter();
  const { id, doiCheck, titleCheck, similarDois, authors } = router.query;
  const [article, setArticle] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const [doiCheckState, setDoiCheckState] = useState(true);
  const [titleCheckState, setTitleCheckState] = useState(true);
  const [similarDoisState, setSimilarDoisState] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // 使用 useEffect 来从 API 获取文章详细信息
  useEffect(() => {
    if (id) {
      fetchArticleDetail(id);
    }

    if (similarDois) {
      setSimilarDoisState(similarDois.split(','));
    }

    if (authors) {
      try {
        const parsedAuthors = JSON.parse(decodeURIComponent(authors));
        setAuthorList(parsedAuthors);
      } catch (e) {
        console.error('Error parsing authors:', e);
      }
    }
  }, [id, similarDois, authors]);


  const fetchArticleDetail = async (articleId) => {
    try {
      const response = await fetch(`/api/articles/${articleId}`); // 调用后端 API 获取文章数据 
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      } const result = await response.json(); const articleData = result.data; // 如果 `doiCheck` 或 `titleCheck` 没有值，则设为 `true` 
      setDoiCheckState(articleData.doiCheck !== undefined ? articleData.doiCheck : true); setTitleCheckState(articleData.titleCheck !== undefined ? articleData.titleCheck : true); setArticle(articleData); // 更新文章数据 
    } catch (error) { console.error('Error fetching article details:', error); }
  };
  const handleAccept = () => {
    setAcceptModalVisible(true);
    setTimeout(() => setAcceptModalVisible(false), 2000);
  };

  const handleReject = () => {
    setRejectModalVisible(true);
  };

  const submitRejectReason = () => {
    setRejectModalVisible(false);
    alert(`Article Rejected with reason: ${rejectReason}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Moderator Article Detail Page</h1>
      <p className="text-center mb-6">Currently viewing article with ID: {id}</p>

      {!article ? (
        <p>Loading article details...</p>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-full sm:col-span-6 xl:col-span-8">
            {/* 传递所有文章数据到 ArticleDetailCard */}
            <ArticleDetailCard
              title={article.title}
              abstract={article.abstract}
              submittedDate={new Date(article.createdAt).toLocaleDateString()}  // 使用 createdAt 作为提交日期
              doi={article.doi}
              journal={article.journal}  // 新增的 journal 字段
              year={article.year}        // 新增的 year 字段
            />
          </div>

          <div className="col-span-full sm:col-span-6 xl:col-span-4">
            <AuthorCard authors={authorList} />
          </div>

          <div className="col-span-full">
            <CheckStatusCard doiCheck={doiCheckState} titleCheck={titleCheckState} similarDois={similarDoisState} />
          </div>

          <div className="col-span-full text-center mt-4">
            {article.status === 'pending' ? (
              <div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleAccept}>
                  Accept
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleReject}>
                  Reject
                </button>
              </div>
            ) : (
              <p className={`font-bold ${article.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                {article.status === 'accepted' ? 'Accepted' : 'Rejected'}
              </p>
            )}
          </div>

          {/* 接受和拒绝弹窗的逻辑保持不变 */}
          {acceptModalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Article has been accepted!</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setAcceptModalVisible(false)}>
                  Close
                </button>
              </div>
            </div>
          )}

          {rejectModalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Please enter the rejection reason:</h2>
                <textarea
                  className="border border-gray-300 rounded w-full p-2 mb-4"
                  rows="4"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-4" onClick={submitRejectReason}>
                    Submit
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setRejectModalVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
