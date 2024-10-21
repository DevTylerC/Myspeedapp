import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticleDetailCard from '../../components/ArticleDetails/ArticleDetailCard';
import AuthorCard from '../../components/ArticleDetails/AuthorCard';
import CheckStatusCard from '../../components/ArticleDetails/CheckStatusCard';

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
  const [rejectReason, setRejectReason] = useState('');

  // Use useEffect to fetch article details from API
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
    try {
      const response = await fetch(`/api/articles/${articleId}`);  // Call the backend API
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      const result = await response.json();
      setArticle(result.data);  // Update article data
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  const handleAccept = async () => {
    setAcceptModalVisible(true);

    if (article) {
      const acceptedArticleData = {
        title: article.title,
        authors: article.authors,
        journal: article.journal,
        year: article.year,
        doi: article.doi,
        abstract: article.abstract,
        keywords: article.keywords,
        status: 'UnAnalyzed',
        researchMethod: 'Wait for analyzing',
        participants: 'Wait for analyzing',
        supportsPractice: 'Wait for analyzing',
        conclusion: 'Wait for analyzing',
      };

      try {
        // Step 1: Save the accepted article
        const response = await fetch('/api/articles/acceptedArticles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(acceptedArticleData),
        });

        const result = await response.json();

        if (response.ok) {
          // Step 2: Send emails to Analyst and Author
          try {
            const emailResponse = await fetch('/api/notifications/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                recipients: [
                  'jingzhaopiao@gmail.com',
                  ...article.authors.map(author => author.email)
                ],
                subject: `New Article Accepted: ${article.title}`,
                message: `The article "${article.title}" has been accepted and is ready for analysis.`,
              }),
            });

            if (emailResponse.ok) {
              console.log('Emails sent successfully.');
            } else {
              throw new Error('Failed to send emails');
            }
          } catch (emailError) {
            console.error('Error sending emails:', emailError);
          }

          // Step 3: Update the article status to 'approved'
          const updateStatus = async () => {
            try {
              const updateResponse = await fetch('/api/articles', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: article._id, status: 'approved' }),
              });

              if (updateResponse.ok) {
                const result = await updateResponse.json();
                console.log('Article status updated successfully:', result);
                setArticle({ ...article, status: 'approved' });
              } else {
                throw new Error('Failed to update article status');
              }
            } catch (error) {
              console.error('Error updating article status:', error);
              alert('There was an issue updating the article status.');
            }
          };

          updateStatus();
        } else {
          throw new Error(result.error || 'Failed to accept article');
        }
      } catch (error) {
        console.error('Error accepting article:', error);
      }
    }

    setTimeout(() => setAcceptModalVisible(false), 2000);
  };

  const handleReject = () => {

    setRejectModalVisible(true);


  };

  const submitRejectReason = () => {
    setRejectModalVisible(false);
    // Update the article status to 'rejected'
    const rejectStatus = async () => {
      try {
        const updateResponse = await fetch('/api/articles', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: article._id, status: 'rejected' }), // Pass article ID and new status
        });

        if (updateResponse.ok) {
          const result = await updateResponse.json();
          console.log('Article status updated successfully:', result);
          setArticle({ ...article, status: 'rejected' });

          // Send email to the Author only
          try {
            const emailResponse = await fetch('/api/notifications/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                recipients: [article.authors[0].email],
                subject: `Your Article "${article.title}" has been Rejected`,
                message: `Dear ${article.authors[0].name},\n\nYour article titled "${article.title}" has been rejected for the following reason: ${rejectReason}\n\n\nThank you for your submission.`,     
              }),
            });

            if (emailResponse.ok) {
              console.log('Email sent successfully to the author.');
            } else {
              throw new Error('Failed to send email');
            }
          } catch (error) {
            console.error('Error sending email:', error);
          }

        } else {
          throw new Error('Failed to update article status');
        }
      } catch (error) {
        console.error('Error updating article status:', error);
      }
    };

    rejectStatus();
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
            {/* Pass all article data to ArticleDetailCard */}
            <ArticleDetailCard
              title={article.title}
              abstract={article.abstract}
              submittedDate={new Date(article.createdAt).toLocaleDateString()}  // Use createdAt as the submission date
              doi={article.doi}
              journal={article.journal}  // Newly added journal field
              year={article.year}        // Newly added year field
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
              <p className={`font-bold ${article.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                {article.status === 'approved' ? 'Accepted' : 'Rejected'}
              </p>
            )}
          </div>

          {/* The logic for accept and reject modals remains unchanged */}
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
                  onChange={(e) => setRejectReason(e.target.value)} //Reason sent to the Author -- via email
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
