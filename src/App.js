import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Projects from './Projects';
import Select from 'react-select';

function App() {
  const url = 'https://wavescan-frontend-assessment.saurabhmudgal.repl.co';
  const [data, setData] = useState([]); //to setData

  //to fetch data
  const loadData = async () => {
    const response = await fetch(url);
    const projects = await response.json();
    setData(projects); //returns data
  };

  const initialValue = {
    text: '',
    length: 0,
  };

  const tag = (data) => {
    let uniqueValues = new Set();
    data.map((dt) => {
      dt.tags.map((tag) => uniqueValues.add(tag));
    });
    let arr = [...uniqueValues];
    var list = [];
    arr.forEach((element) => {
      list.push({ label: element, value: element });
    });
    return list;
  };

  const [searchTerm, setSearchTerm] = useState(initialValue);
  //search project by its desc and title
  const [searchParam] = useState(['title', 'description']);

  const [selectOptions, setOptions] = useState([]);

  const handleSearch = (data) => {
    const filtered = filterData(data);
    if (searchTerm.length >= 3) {
      return filtered.filter((item) => {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(searchTerm.text.toLowerCase()) > -1
          );
        });
      });
    } else {
      return filtered;
    }
  };

  const filterData = (data) => {
    return data.filter((project) => {
      if (selectOptions.length > 0) {
        return selectOptions.every((key) => {
          return project['tags'].some((keyEle) => key.value.includes(keyEle));
        });
      } else {
        return data;
      }
    });
  };

  const handleFilter = (options) => {
    setOptions(options);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-light bg-light shadow ">
        <div className="container-fluid">
          <div className="mx-auto" style={{ width: '30em' }}>
            <div
              className="input-group"
              style={{ width: '100%', margin: '5px 0' }}
            >
              <input
                type="text"
                autoComplete="off"
                name="search"
                className="form-control"
                placeholder="Search a project, enter atleast three words"
                aria-label="Search a project"
                value={searchTerm.text}
                onChange={(e) =>
                  setSearchTerm({
                    text: e.target.value,
                    length: e.target.value.split(' ').length,
                  })
                }
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="bi bi-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="mx-auto" style={{ width: '30em', margin: '5px 0' }}>
            <Select
              onChange={handleFilter}
              isMulti={true}
              options={tag(data)}
              placeholder="Filter"
            />
          </div>
        </div>
      </nav>

      <Projects projects={handleSearch(data)} />
    </div>
  );
}

export default App;
