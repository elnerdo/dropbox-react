import React, { PropTypes } from 'react';
import CollapseFolder from './collapsefolder.js';


const propTypes = {
  folders: PropTypes.object
};

const defaultProps = {
  folders: {}
}

class CollapseFolderGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { title, folders } = this.props;
    let collapseFolders = []

    for(let folder in folders) {
      collapseFolders.push(<CollapseFolder key={folder} title={folder} files={folders[folder]}/>)
    }

    return (
      <div>
        <h3>{title}</h3>
        {collapseFolders}
      </div>
    )
  }
}

CollapseFolderGroup.defaultProps = defaultProps;
CollapseFolderGroup.propTypes = propTypes;

export default CollapseFolderGroup;
