// TODO: validate config data, set default values if something is wrong or undefined.
//       maybe use state for config.

import React, { PropTypes } from 'react';
import CollapseFolderGroup from './collapsefoldergroup.js';
import { DropboxContainerStyle } from './styles/dropboxcontainerstyle.js';
import $ from 'jquery';

const propTypes = {
  config: PropTypes.object
};

const defaultProps = {
  style: DropboxContainerStyle.imko,
  prefixToHumanReadable: {
    'en': {
      'sme': 'Soil Moisture / Environment',
      'gbi': 'Grain Moisture / Bulk Industry',
      'cti': 'Construction Industry'
    },
    'de': {
      'sme': 'Bodenfeuchte / Umwelt',
      'gbi': 'Kornfeuchte / Schüttgutindustrie',
      'cti': 'Bauindustrie'
    }
  },
  defaultPath: () => {
    let pathParts = window.location.href.split('/')
    return pathParts[pathParts.length - 1]
  },
  defaultLanguage: () => {
    let pathParts = window.location.href.split('/')
    let lang = pathParts.includes('de') ? 'de' : 'en'
    return lang
  },
  defaultMap: {},
  defaultFilter: []
};


class DropboxContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {data: {}}
    this.setData = this.setData.bind(this)
    this.getConfig = this.getConfig.bind(this)
    this.getGroups = this.getGroups.bind(this)
  }

  componentDidMount() {

    const { datasource } = this.props
    let setData = this.setData
    let config = this.getConfig()

    var ws = new WebSocket('ws://' + datasource)
    
    ws.onopen = function() {
      ws.send("Hello, world")
    }

    ws.onmessage = function (evt) {
      var data =  JSON.parse(evt.data)
      setData(data[config.path])
    }
  }

  setData(data) {
    let config = this.getConfig()
    // only apply filter if there is a least one
    if (config.filter.length > 0) {
      for(let folder in data.folders) {
        if(!config.filter.includes(folder)) {
          delete data.folders[folder]
        }
      }
    }
    this.setState({data: data})
  }

  getConfig() {
    const { config, defaultPath, defaultMap, defaultLanguage, defaultFilter } = this.props

    var _config = {}

    _config.path = config.path == undefined ? defaultPath() : config.path
    _config.map = config.map == undefined ? defaultMap : config.map
    _config.language = config.language == undefined ? defaultLanguage() : config.language
    _config.filter = config.filter == undefined ? defaultFilter : config.filter 

    return _config
  }

  getGroups() {
    const { data } = this.state
    let groups = {}
    for(let folder in data.folders) {
      let[prefix, name] = folder.split('_', 2)
      if(!(prefix in groups)) {
        groups[prefix] = {}
      }
      groups[prefix][name] = data.folders[folder]
    }
    return groups
  }

  render() {

    const { prefixToHumanReadable, style } = this.props;
    let config = this.getConfig()
    let groups = this.getGroups()
    let collapseFolder = []

    console.log(config)
    console.log(groups)

    for(let grp in groups) {
      let title =  prefixToHumanReadable[config.language][grp]
      collapseFolder.push(<CollapseFolderGroup title={title} key={grp} folders={groups[grp]} map={config.map}/>)
    }

    return(
      <div style={style}>
        {collapseFolder}
      </div>
    );
  }
}

DropboxContainer.defaultProps = defaultProps;
DropboxContainer.propTypes = propTypes;

export default DropboxContainer;
