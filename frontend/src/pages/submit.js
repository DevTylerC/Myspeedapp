import { useState } from 'react';
import Banner from '../components/Banner';  // 导入 Banner 组件

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: [{ name: '', email: '' }], // 初始只有一个author
    journal: '',
    year: '',
    doi: '',
    abstract: '',  
    keywords: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openBanner, setOpenBanner] = useState(false);  // 控制 Banner 显示
  const [bannerType, setBannerType] = useState('');  // 控制 Banner 类型
  const [bannerMessage, setBannerMessage] = useState('');  // 控制 Banner 内容

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAuthorChange = (index, field, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index][field] = value;
    setFormData({ ...formData, authors: newAuthors });
  };

  const addAuthor = () => {
    if (formData.authors.length < 6) {
      setFormData({
        ...formData,
        authors: [...formData.authors, { name: '', email: '' }],
      });
    }
  };

  const removeAuthor = (index) => {
    const newAuthors = formData.authors.filter((_, i) => i !== index);
    setFormData({ ...formData, authors: newAuthors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setSubmitted(true);
        setOpenBanner(true);
        setBannerType('success');
  
        if (data.warning) {
          setBannerType('warning'); // Assuming you have a 'warning' type for Banner
          setBannerMessage(data.warning);  // Notify about duplicate DOI
        } else {
          // Update the message to indicate both submission and email notification
          setBannerMessage('Article submitted successfully! The moderator has been notified.');
        }
      } else {
        throw new Error(data.message || 'Failed to submit article');
      }
    } catch (error) {
      setOpenBanner(true);
      setBannerType('error');
      setBannerMessage(error.message);
    }
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Submit an Article</h1>

      {/* Banner 组件 */}
      <Banner type={bannerType} open={openBanner} setOpen={setOpenBanner}>
        {bannerMessage}
      </Banner>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Authors Section */}
          <div className="mb-4">
            <label className="block text-gray-700">Authors</label>
            {formData.authors.map((author, index) => (
              <div key={index} className="mb-2 p-4 border border-gray-300 rounded">
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    value={author.name}
                    onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={`Author ${index + 1} Name`}
                    required
                  />
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="email"
                    value={author.email}
                    onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={`Author ${index + 1} Email`}
                    required
                  />
                </div>
                {formData.authors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="ml-2 p-2 bg-red-600 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {formData.authors.length < 6 && (
              <button
                type="button"
                onClick={addAuthor}
                className="mt-2 p-2 bg-green-600 text-white rounded"
              >
                Add Author
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Journal Name</label>
            <input
              type="text"
              name="journal"
              value={formData.journal}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Year of Publication</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">DOI</label>
            <input
              type="text"
              name="doi"
              value={formData.doi}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Abstract</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a brief summary of the article"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Keywords</label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter keywords separated by commas"
              required
            />
          </div>


          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Article
          </button>
        </form>
      ) : (
        <p className="text-green-600">Submission successful! Thank you for your contribution.</p>
      )}
    </div>
  );
};

export default Submit;
