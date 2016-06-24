import React, { PropTypes } from 'react';
import { Button, Collapse, Well } from 'react-bootstrap';
import DownloadFile from './downloadfile.js';


const propTypes = {
  title: PropTypes.string.isRequired,
  files: PropTypes.object
};

const defaultProps = {
  files: {}
};

class CollapseFolder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {

    const { files, title } = this.props;

    const folderContent = []

    for(let file in files) {
      folderContent.push(<DownloadFile key={file} file={files[file]}/>)
    }

    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
        {title}
        </Button>
          <Collapse in={this.state.open}>
            <div>
              <Well>
                {folderContent}
              </Well>
            </div>
          </Collapse>
        </div>
    );
  }
}

CollapseFolder.propTypes = propTypes;
CollapseFolder.defaultProps = defaultProps;

export default CollapseFolder;
