import React from 'react';
import { Building2, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Schemes: React.FC = () => {
  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN Samman Nidhi',
      description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
      amount: '₹6,000/year',
      status: 'active',
      deadline: '2024-03-31',
      category: 'Income Support',
      eligibility: 'Small & Marginal Farmers',
      applyUrl: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme providing financial support to farmers',
      amount: 'Up to ₹2,00,000',
      status: 'eligible',
      deadline: '2024-04-15',
      category: 'Insurance',
      eligibility: 'All Farmers',
      applyUrl: 'https://pmfby.gov.in/'
    },
    {
      id: 3,
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and nutrient management recommendations',
      amount: 'Free Service',
      status: 'applied',
      deadline: '2024-05-30',
      category: 'Soil Health',
      eligibility: 'All Farmers',
      applyUrl: 'https://soilhealth.dac.gov.in/'
    },
    {
      id: 4,
      name: 'Kisan Credit Card',
      description: 'Easy access to credit for agricultural and allied activities',
      amount: 'Up to ₹3,00,000',
      status: 'eligible',
      deadline: '2024-12-31',
      category: 'Credit',
      eligibility: 'All Farmers',
      applyUrl: 'https://www.myscheme.gov.in/schemes/kcc'
    },
    {
      id: 5,
      name: 'National Agriculture Market (e-NAM)',
      description: 'Online trading platform for agricultural commodities',
      amount: 'Better Prices',
      status: 'active',
      deadline: 'Ongoing',
      category: 'Marketing',
      eligibility: 'All Farmers',
      applyUrl: 'https://enam.gov.in/'
    },
    {
      id: 6,
      name: 'Paramparagat Krishi Vikas Yojana',
      description: 'Promotion of organic farming practices',
      amount: '₹50,000/hectare',
      status: 'eligible',
      deadline: '2024-06-30',
      category: 'Organic Farming',
      eligibility: 'Organic Farmers',
      applyUrl: 'https://pgsindia-ncof.gov.in/'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-forest-100 text-forest-700';
      case 'eligible': return 'bg-blue-100 text-blue-700';
      case 'applied': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'eligible': return <AlertCircle className="h-4 w-4" />;
      case 'applied': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Building2 className="w-8 h-8 mr-3 text-forest-600" />
            Government Schemes
          </h1>
          <p className="text-gray-600 max-w-3xl">Explore and apply for agricultural schemes and subsidies to support your farming operations.</p>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-forest-200 transition-all flex flex-col h-full group">
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-forest-50 group-hover:bg-forest-100 transition-colors rounded-xl flex items-center justify-center border border-forest-100">
                  <Building2 className="h-6 w-6 text-forest-600" />
                </div>
                <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(scheme.status)}`}>
                  {getStatusIcon(scheme.status)}
                  <span>{scheme.status}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-forest-700 transition-colors">{scheme.name}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{scheme.description}</p>

              <div className="space-y-4 mb-8 bg-gray-50/50 p-4 rounded-xl border border-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Benefit Amount</span>
                  <span className="font-bold text-forest-700">{scheme.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <span className="text-sm font-semibold text-gray-900">{scheme.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Eligibility</span>
                  <span className="text-sm font-semibold text-gray-900">{scheme.eligibility}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    Deadline
                  </span>
                  <span className="text-sm font-bold text-red-600">{scheme.deadline}</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-auto">
                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center py-2.5 px-4 rounded-xl text-sm font-semibold shadow-sm transition-colors ${
                    scheme.status === 'eligible'
                      ? 'bg-forest-600 text-white hover:bg-forest-700'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {scheme.status === 'eligible' ? 'Apply Now' : 'View Details'}
                </a>
                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-forest-600 transition-colors flex items-center justify-center bg-white shadow-sm"
                >
                  <FileText className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
