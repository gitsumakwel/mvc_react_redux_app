// Routes
import React from "react";
import { Route, Routes , BrowserRouter as Router} from "react-router-dom"; //removed import: Link (not use)
import { Home, About, Contact, Courseworx, Project, Blog, Header, NotFound } from "../views/pages";
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
const DisplayHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

const Routex = () => {
    return (
        <Provider store={store}>
  				<Router>
            <div>
              <DisplayHeader/>
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
