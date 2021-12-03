// Routes
import React from "react";
import { Route, Routes , Link, BrowserRouter as Router} from "react-router-dom";
import { Home, About, Contact, Courseworx, Project, Blog, NotFound } from "../views/pages";
import "../index.css";
import { store } from '../app/store';
import { connect,Provider } from 'react-redux';
import {mapStateToProps} from '../app/state';
import {mapDispatchToProps} from '../app/dispatch';

const DisplayHome = connect(mapStateToProps, mapDispatchToProps)(Home);
const DisplayAbout = connect(mapStateToProps, mapDispatchToProps)(About);
const DisplayContact = connect(mapStateToProps, mapDispatchToProps)(Contact);
const DisplayCourseworx = connect(mapStateToProps, mapDispatchToProps)(Courseworx);
const DisplayProject = connect(mapStateToProps, mapDispatchToProps)(Project);
const DisplayBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);


const Routex = () => {
    return (
        <Provider store={store}>
  				<Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/coursework">Coursework</Link>
                </li>
                <li>
                  <Link to="/project">Project</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                {/* contact will be floating for all pages*/}
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>

              <hr />


              <Routes>
                  <Route exact caseSensitive={false} path="/" element={<DisplayHome/>} />
                  <Route exact caseSensitive={false} path="/about" element={<DisplayAbout/>} />
                  <Route exact caseSensitive={false} path="/blog" element={<DisplayBlog/>} />
                  <Route exact caseSensitive={false} path="/contact" element={<DisplayContact/>} />
                  <Route exact caseSensitive={false} path="/coursework" element={<DisplayCourseworx/>} />
                  <Route exact caseSensitive={false} path="/project" element={<DisplayProject/>} />
                  <Route exact path="*" element={<NotFound/>} />
              </Routes>
            </div>
  				</Router>
        </Provider>

    );
};

export default Routex;
