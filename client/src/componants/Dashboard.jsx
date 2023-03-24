import React from 'react';
import Sidebar101 from './Sidebar101';

function Dashboard({onLogout }) {
  return (<>
    <div className="flex h-screen sticky top-0">
      <Sidebar101  onLogout={onLogout}/>
      <div className="flex-grow bg-gray-100 overflow-y-auto h-screen">
        <div className="p-4">
          <div>
            <h1 className="text-xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-lg font-bold mb-2">Widget 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-lg font-bold mb-2">Widget 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              {/* Add additional widgets here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Dashboard;