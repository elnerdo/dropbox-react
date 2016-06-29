import React, { PropTypes } from 'react';
import CollapseFolder from './collapsefolder.js';
import { CollapseFolderGroupStyle } from './styles/collapsefoldergroupstyle.js';


const propTypes = {
  folders: PropTypes.object,
  map: PropTypes.object
};

const defaultProps = {
  folders: {},
  style: CollapseFolderGroupStyle.imko
}

class CollapseFolderGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { title, folders, map, style } = this.props;
    let collapseFolders = []


    for(let folder in folders) {
      let alias = folder in map ? map[folder] : folder
      collapseFolders.push(<CollapseFolder key={folder} title={alias} files={folders[folder]}/>)
    }


    return (
      <div style={style}>
        <h3>{title}</h3> 
        {collapseFolders}
      </div>
    )
  }
}

CollapseFolderGroup.defaultProps = defaultProps;
CollapseFolderGroup.propTypes = propTypes;

export default CollapseFolderGroup;
