import React, { PropTypes } from 'react';
import CollapseFolderGroup from './collapsefoldergroup.js';
import $ from 'jquery';

const propTypes = {
  config: PropTypes.object.isRequired,
};

const defaultProps = {
  prefixToHumanReadable: {
    'en': {
      'sme_': 'SME_ENGLISH',
      'gbi_': 'GBI_ENGLISH',
      'cti_': 'CTI_ENGLISH'
    },
    'de': {
      'sme_': 'SME_DEUTSCH',
      'gbi_': 'GBI_DEUTSCH',
      'cti_': 'CTI_DEUTSCH'
    }
  }
};


class DropboxContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: {}}
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {

    const { config } = this.props;
    let setData = this.setData;

    var ws = new WebSocket("ws://192.168.1.207:8080/dropbox/data");
    ws.onopen = function() {
      ws.send("Hello, world");
    };
    ws.onmessage = function (evt) {
    const alldata =  JSON.parse(evt.data);
    //const data = alldata["{{ folder }}"]["{{ group}}"]["folders"]["{{ f }}"];
    setData(alldata[config.title]);

    };
  }

  setData(data) {
    this.setState({data: data})
  }

  render() {

    const { config, prefixToHumanReadable } = this.props;
    const { data } = this.state;

    let collapseFolder = []

    for(let grp in data) {
      let title = prefixToHumanReadable[config.language][grp]
      collapseFolder.push(<CollapseFolderGroup title={title} key={grp} folders={data[grp].folders}/>)
    }


    return(
      <div>
        <h3>{config.title}</h3>
        {collapseFolder}
      </div>
    );
  }
}

DropboxContainer.defaultProps = defaultProps;
DropboxContainer.propTypes = propTypes;

export default DropboxContainer;
