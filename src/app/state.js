//states and mapStateToProps
const statusState = {
  inputcourseworx: 0,
  inputabout: 0,
  inputproject: 0,
  inputblog: 0,
  togglecontact: false,
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}

export{
  statusState,
  mapStateToProps,
}
