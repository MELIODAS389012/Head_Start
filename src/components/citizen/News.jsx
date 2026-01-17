import { newsData } from '../../data';

function News() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📰 News Feed & Alerts</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main News Feed */}
        <div className="lg:col-span-2 space-y-6">
          {newsData.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=News+Image';
                }}
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    article.category === 'Earthquake' ? 'bg-orange-100 text-orange-800' :
                    article.category === 'Tsunami' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
                <p className="text-gray-700">{article.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">🚨 Recent Alerts</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-yellow-500 pl-3">
                <p className="font-semibold text-sm">Animal Behavior Anomaly</p>
                <p className="text-xs text-gray-600">California - 2 hours ago</p>
              </div>
              <div className="border-l-4 border-red-500 pl-3">
                <p className="font-semibold text-sm">Earthquake Warning</p>
                <p className="text-xs text-gray-600">Seattle - 5 hours ago</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold text-sm">Tsunami Watch</p>
                <p className="text-xs text-gray-600">Hawaii - 1 day ago</p>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">💡 Daily Safety Tip</h2>
            <p className="mb-4">
              Keep a flashlight and extra batteries next to your bed. Power outages often occur during disasters.
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition">
              More Tips
            </button>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">📊 This Week</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Alerts Sent</span>
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">False Positives</span>
                <span className="text-2xl font-bold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Lives Saved</span>
                <span className="text-2xl font-bold text-purple-600">127</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
