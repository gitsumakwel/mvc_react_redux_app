//for action and mapDispatchToProps
import {
  COURSEWORX,
  ABOUT,
  PROJECT,
  BLOG,
  CONTACT
} from './constants'

const sectionCourseworx = (inputsection) => {
  return {
    type: COURSEWORX,
    inputcourseworx: inputsection,
  }
}
const sectionAbout = (inputsection) => {
  return {
    type: ABOUT,
    inputabout: inputsection,
  }
}
const sectionProject = (inputsection) => {
  return {
    type: PROJECT,
    inputproject: inputsection,
  }
}
const sectionBlog = (inputsection) => {
  return {
    type: BLOG,
    inputblog: inputsection,
  }
}
const toggleContact = () => {
  return {
    type: CONTACT,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCourseworx : (inputsection)=>dispatch(sectionCourseworx(inputsection)),
    dispatchAbout: (inputsection)=>dispatch(sectionAbout(inputsection)),
    dispatchProject: (inputsection)=>dispatch(sectionProject(inputsection)),
    dispatchBlog: (inputsection)=>dispatch(sectionBlog(inputsection)),
    dispatchContact: ()=>dispatch(toggleContact()),
  }
}

export {
  mapDispatchToProps,
}
