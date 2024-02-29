import React from 'react';
import ListItemsComponent from './Components/ListItemsComponent';
import PaginationComponent from './Components/PaginationComponent';
import FilterComponent from './Components/FilterComponent';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-4 overflow-hidden rounded shadow">
        <div className="row bg-white flex-md-row">

          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
            <div className="d-flex flex-column justify-content-between p-4">
              <FilterComponent />
              <hr />

              <PaginationComponent />

            </div>
          </div>

          <div className="col p-0">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <ListItemsComponent />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
