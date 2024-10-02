import { useRouter } from 'next/router';
import ArticleDetailCard from '../../components/ArticleDetails/ArticleDetailCard';
import AuthorCard from '../../components/ArticleDetails/AuthorCard';
import CheckStatusCard from '../../components/ArticleDetails/CheckStatusCard';
import { useState, useEffect } from 'react';

function ArticleDetail() {
  const router = useRouter();
  const { id, doiCheck, titleCheck, similarDois, authors } = router.query;
  const [article, setArticle] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const [doiCheckState, setDoiCheckState] = useState(false);
  const [titleCheckState, setTitleCheckState] = useState(false);
  const [similarDoisState, setSimilarDoisState] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState(''); // 记录拒绝理由

  useEffect(() => {
    if (id) {
      fetchArticleDetail(id);
    }

    if (doiCheck !== undefined) {
      setDoiCheckState(doiCheck === 'true');
    }
    if (titleCheck !== undefined) {
      setTitleCheckState(titleCheck === 'true');
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
  }, [id, doiCheck, titleCheck, similarDois, authors]);

  const fetchArticleDetail = async (articleId) => {
    const articleData = {
      title: 'AI in Medicine: Revolutionizing Healthcare',
      abstract: 'This article explores the application of AI technologies in healthcare...',
      submittedDate: '2024-09-12',
      doi: '10.1234/ai-medicine-2024',
      status: 'accepted', // 用于判断当前文章状态
    };

    setArticle(articleData);
  };

  const handleAccept = () => {
    setAcceptModalVisible(true);
    setTimeout(() => setAcceptModalVisible(false), 2000); // 2秒后自动关闭提示
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
            <ArticleDetailCard title={article.title} abstract={article.abstract} submittedDate={article.submittedDate} doi={article.doi} />
          </div>

          <div className="col-span-full sm:col-span-6 xl:col-span-4">
            <AuthorCard authors={authorList} />
          </div>

          <div className="col-span-full">
            <CheckStatusCard doiCheck={doiCheckState} titleCheck={titleCheckState} similarDois={similarDoisState} />
          </div>

          {/* 按钮和状态显示区 */}
          <div className="col-span-full text-center mt-4">
            {article.status === 'pending' ? (
              <div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
                  onClick={handleAccept}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleReject}
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className={`font-bold ${article.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                {article.status === 'accepted' ? 'Accepted' : 'Rejected'}
              </p>
            )}
          </div>

          {/* 接受弹窗 */}
          {acceptModalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Article has been accepted!</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setAcceptModalVisible(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* 拒绝弹窗 */}
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
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                    onClick={submitRejectReason}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setRejectModalVisible(false)}
                  >
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
