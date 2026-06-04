import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Users, Sprout, ChevronRight, Leaf } from "lucide-react";
import mapImage from "../../Images/green-india-map-DFG1YW.jpg";

// Map of India with states
const states = [
  { id: "AP", name: "Andhra Pradesh", active: true, position: { x: 55, y: 65 } },
  { id: "AR", name: "Arunachal Pradesh", active: false, position: { x: 88, y: 25 } },
  { id: "AS", name: "Assam", active: true, position: { x: 85, y: 32 } },
  { id: "BR", name: "Bihar", active: true, position: { x: 68, y: 42 } },
  { id: "CG", name: "Chhattisgarh", active: true, position: { x: 58, y: 55 } },
  { id: "GA", name: "Goa", active: false, position: { x: 35, y: 68 } },
  { id: "GJ", name: "Gujarat", active: true, position: { x: 32, y: 48 } },
  { id: "HR", name: "Haryana", active: true, position: { x: 45, y: 32 } },
  { id: "HP", name: "Himachal Pradesh", active: false, position: { x: 48, y: 25 } },
  { id: "JH", name: "Jharkhand", active: true, position: { x: 68, y: 48 } },
  { id: "KA", name: "Karnataka", active: true, position: { x: 42, y: 72 } },
  { id: "KL", name: "Kerala", active: true, position: { x: 42, y: 85 } },
  { id: "MP", name: "Madhya Pradesh", active: true, position: { x: 50, y: 50 } },
  { id: "MH", name: "Maharashtra", active: true, position: { x: 42, y: 60 } },
  { id: "MN", name: "Manipur", active: false, position: { x: 88, y: 42 } },
  { id: "ML", name: "Meghalaya", active: false, position: { x: 82, y: 38 } },
  { id: "MZ", name: "Mizoram", active: false, position: { x: 90, y: 45 } },
  { id: "NL", name: "Nagaland", active: false, position: { x: 92, y: 38 } },
  { id: "OD", name: "Odisha", active: true, position: { x: 65, y: 58 } },
  { id: "PB", name: "Punjab", active: true, position: { x: 42, y: 28 } },
  { id: "RJ", name: "Rajasthan", active: true, position: { x: 38, y: 38 } },
  { id: "SK", name: "Sikkim", active: false, position: { x: 78, y: 32 } },
  { id: "TN", name: "Tamil Nadu", active: true, position: { x: 48, y: 80 } },
  { id: "TG", name: "Telangana", active: true, position: { x: 52, y: 62 } },
  { id: "TR", name: "Tripura", active: false, position: { x: 85, y: 45 } },
  { id: "UK", name: "Uttarakhand", active: false, position: { x: 52, y: 28 } },
  { id: "UP", name: "Uttar Pradesh", active: true, position: { x: 58, y: 38 } },
  { id: "WB", name: "West Bengal", active: true, position: { x: 75, y: 48 } }
];

// Helper function to generate random crops based on state
function generateRandomCrops(state: string) {
  const allCrops = [
    "Rice", "Wheat", "Maize", "Barley", "Jowar", "Bajra", "Ragi",
    "Cotton", "Jute", "Sugarcane", "Tea", "Coffee", "Rubber",
    "Coconut", "Cashew", "Mango", "Banana", "Orange", "Pineapple",
    "Potato", "Tomato", "Onion", "Cauliflower", "Cabbage", "Brinjal",
    "Chilli", "Turmeric", "Ginger", "Cardamom", "Black Pepper"
  ];

  const stateSpecificCrops: Record<string, string[]> = {
    "Punjab": ["Wheat", "Rice", "Barley", "Sugarcane", "Cotton"],
    "Kerala": ["Coconut", "Rubber", "Tea", "Coffee", "Black Pepper"],
    "Tamil Nadu": ["Rice", "Sugarcane", "Banana", "Coconut", "Tea"],
    "Maharashtra": ["Cotton", "Sugarcane", "Onion", "Jowar", "Soybean"],
    "Gujarat": ["Cotton", "Groundnut", "Dates", "Sugarcane", "Bajra"],
    "Uttar Pradesh": ["Wheat", "Rice", "Sugarcane", "Potato", "Mustard"],
    "West Bengal": ["Rice", "Jute", "Tea", "Potato", "Wheat"],
    "Andhra Pradesh": ["Rice", "Chilli", "Cotton", "Sugarcane", "Tobacco"]
  };

  if (state in stateSpecificCrops) {
    return stateSpecificCrops[state];
  } else {
    const numCrops = 4 + Math.floor(Math.random() * 2);
    const shuffled = [...allCrops].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numCrops);
  }
}

export default function MapSection() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [stateCounts] = useState({
    farmers: {
      "Andhra Pradesh": 5420,
      "Assam": 3218,
      "Bihar": 4876,
      "Chhattisgarh": 3654,
      "Gujarat": 5982,
      "Haryana": 4321,
      "Jharkhand": 2765,
      "Karnataka": 6124,
      "Kerala": 3421,
      "Madhya Pradesh": 5678,
      "Maharashtra": 7421,
      "Odisha": 4321,
      "Punjab": 6543,
      "Rajasthan": 5432,
      "Tamil Nadu": 5876,
      "Telangana": 4567,
      "Uttar Pradesh": 8765,
      "West Bengal": 5432
    },
    hectares: {
      "Andhra Pradesh": 12450,
      "Assam": 8750,
      "Bihar": 11350,
      "Chhattisgarh": 9870,
      "Gujarat": 14650,
      "Haryana": 12540,
      "Jharkhand": 7650,
      "Karnataka": 15432,
      "Kerala": 8970,
      "Madhya Pradesh": 16540,
      "Maharashtra": 18750,
      "Odisha": 10650,
      "Punjab": 14320,
      "Rajasthan": 15670,
      "Tamil Nadu": 13450,
      "Telangana": 11760,
      "Uttar Pradesh": 21540,
      "West Bengal": 13650
    }
  });

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      
      {/* Very subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 font-bold text-xs tracking-wide uppercase mb-6"
          >
            Nationwide Impact
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-[800] text-gray-900 leading-tight tracking-tight mb-6"
          >
            SmartAgro <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Across India</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            Our platform is actively transforming agriculture across multiple states, helping thousands of farmers modernize their practices and optimize yields.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch justify-center max-w-7xl mx-auto">
          
          {/* Left: Map Visualization Container */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] relative bg-gray-50/50 rounded-[2.5rem] border border-gray-100 flex flex-col p-8 lg:p-12"
          >
            {/* The actual Map Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-xl mx-auto">
              
              <div className="absolute inset-0 z-0 flex items-center justify-center mix-blend-multiply opacity-70">
                <img
                  src={mapImage}
                  alt="India Map"
                  className="w-[90%] h-[90%] object-contain"
                />
              </div>

              {/* Data Points Layer */}
              <div className="absolute inset-0 z-10 pt-[5%] pl-[5%]">
                {states.map((state) => (
                  <motion.div
                    key={state.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${state.position.x}%`, top: `${state.position.y}%` }}
                    onMouseEnter={() => state.active && setActiveState(state.name)}
                    onMouseLeave={() => setActiveState(null)}
                  >
                    <div
                      className={`transition-all duration-300 relative ${
                        state.active
                          ? "w-4 h-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] group-hover:scale-125 group-hover:bg-green-400 ring-4 ring-white"
                          : "w-2.5 h-2.5 rounded-full bg-gray-300 ring-2 ring-white"
                      }`}
                    >
                      {/* Pulse effect for active states */}
                      {state.active && (
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                      <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                        {state.name}
                      </div>
                      <div className="w-2 h-2 bg-gray-900 rotate-45 absolute -top-1 left-1/2 transform -translate-x-1/2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Legend */}
            <div className="mt-auto pt-8 flex items-center justify-center gap-8 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 ring-4 ring-green-50" />
                <span>Active Region</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-gray-50" />
                <span>Planned Expansion</span>
              </div>
            </div>
          </motion.div>

          {/* Right: State Information Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[45%]"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col p-8 lg:p-12 relative overflow-hidden min-h-[500px]">
              
              <AnimatePresence mode="wait">
                {activeState && stateCounts.farmers[activeState as keyof typeof stateCounts.farmers] ? (
                  <motion.div 
                    key="active"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    <div className="mb-10 pb-6 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                        {activeState}
                      </h3>
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <Map className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                      <div className="bg-green-50/80 p-6 rounded-2xl border border-green-100 group hover:bg-green-50 transition-colors">
                        <div className="flex items-center gap-3 mb-3 text-green-700">
                          <Users className="w-5 h-5" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">Farmers</h4>
                        </div>
                        <p className="text-4xl font-extrabold text-green-800 tracking-tight">
                          {stateCounts.farmers[activeState as keyof typeof stateCounts.farmers].toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-100 group hover:bg-emerald-50 transition-colors">
                        <div className="flex items-center gap-3 mb-3 text-emerald-700">
                          <Sprout className="w-5 h-5" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">Hectares</h4>
                        </div>
                        <p className="text-4xl font-extrabold text-emerald-800 tracking-tight">
                          {stateCounts.hectares[activeState as keyof typeof stateCounts.hectares].toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-2xl" />
                      <p className="text-gray-600 leading-relaxed font-medium pl-2">
                        "In {activeState}, we're actively helping farmers optimize their agricultural practices
                        through AI-driven soil analysis and localized weather forecasting."
                      </p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Leaf className="w-4 h-4" /> Primary Crops
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {generateRandomCrops(activeState).map((crop, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-white rounded-xl text-gray-700 font-semibold text-sm border border-gray-200 shadow-sm hover:border-green-500 hover:text-green-600 hover:shadow-md transition-all cursor-default"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                    <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-8 relative">
                      <Map className="w-10 h-10 text-gray-300" />
                      <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Our Reach</h3>
                    <p className="text-gray-500 max-w-sm mb-12 leading-relaxed">
                      Hover over the active green dots on the map to see localized impact statistics and primary crop data for that specific region.
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-3xl font-extrabold text-gray-900 mb-1">18</p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">States Active</p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-3xl font-extrabold text-gray-900 mb-1">85k+</p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Farmers</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
