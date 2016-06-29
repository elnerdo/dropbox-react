import React, { PropTypes } from 'react';
import { Button, Collapse, Well } from 'react-bootstrap';
import DownloadFile from './downloadfile.js';
import { CollapseFolderStyle } from './styles/collapsefolderstyle.js';

const propTypes = {
  title: PropTypes.string.isRequired,
  files: PropTypes.object
};

const defaultProps = {
  files: {},
  style: CollapseFolderStyle
};

class CollapseFolder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {

    const { files, title, style } = this.props;

    const folderContent = []

    for(let file in files) {
      folderContent.push(<DownloadFile key={file} file={files[file]}/>)
    }

    return (
      <div style={style.imko}>
        <div onClick={() => this.setState({open: !this.state.open})}>
          <span style={this.state.open ? style.open : style.close}>{this.state.open ? '-' : '+'}</span>
          <span>{title}</span>
        </div>
        <Collapse in={this.state.open} style={style.collapse}>
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
