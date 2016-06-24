import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import $ from 'jquery';

/*
'impbus2-protocol-pico_0-22.pdf': {
  'media_info': None,
  'id': 'id:xjIj_tkwGh4AAAAAAAAW6A',
  'name': 'IMPBus2-Protocol-Pico_0-22.pdf',
  'rev': '92e0008107f0',
  'path_lower': '/imko/protocol/sme_pico/impbus2-protocol-pico_0-22.pdf',
  'size': 300089,
  'client_modified': 'September 08, 2010',
  'parent_shared_folder_id': '8456176',
  'server_modified': 'May 29, 2015'
}
*/

const propTypes = {
  file: PropTypes.object.isRequired,
  endpoint: PropTypes.string
};


const defaultProps = {
  endpoint: '/dropbox/download'
};

class DownloadFile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.download = this.download.bind(this);
    this.formatFileSize = this.formatFileSize.bind(this);
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  download(event) {
    const { endpoint, file  } = this.props;
    const data = $(event.target).parent().find('form').serialize();

    $.ajax({
      url: endpoint,
      type: 'POST',
      data: data 
    });
    return false;
  }

  formatFileSize(filesize) {
    var unit = 'B';
    var size = filesize;
    switch (true) {
      case filesize > Math.pow(1024, 4):
        unit = 'TB';
        size = filesize / Math.pow(1024, 4);
        break;
      case filesize > Math.pow(1024, 3):
        unit = 'GB';
        size = filesize / Math.pow(1024, 3);
        break;
      case filesize > Math.pow(1024, 2):
        unit = 'MB';
        size = filesize / Math.pow(1024, 2);
        break;
      case filesize > Math.pow(1024, 1):
        unit = 'KB';
        size = filesize / Math.pow(1024, 1);
        break;
    }
    return (Math.round(size * 100)/100 + unit);
  }

  render() {

    const { file, endpoint } = this.props;
    
    const filesize = this.formatFileSize(file.size)

    return (
      <div>
      <div onClick={this.open}>
        {file.name}        
      </div>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{file.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Filesize: {filesize}<br/>
        Date: {file.server_modified} 
        </Modal.Body>
        <Modal.Footer>
          <form action={endpoint} method="post" onSubmit={this.download}>
            <input type="submit" value="Download" />
            <input type="hidden" name="download" value={file.path_lower} />
          </form>
          <Button onClick={this.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}


DownloadFile.propTypes = propTypes;
DownloadFile.defaultProps = defaultProps;

export default DownloadFile
