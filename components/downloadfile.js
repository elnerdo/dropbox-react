import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Spinner from 'spin';
import { DownloadFileStyle } from './styles/downloadfilestyle.js';
import { IconStyle } from './styles/iconstyle.js';
import $ from 'jquery';


const propTypes = {
  file: PropTypes.object.isRequired,
  endpoint: PropTypes.string
};


const defaultProps = {
  endpoint: '/dropbox/download',
  style: DownloadFileStyle,
  iconStyle: IconStyle
};

class DownloadFile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.download = this.download.bind(this);
    this.formatFileSize = this.formatFileSize.bind(this);
    this.getIcon = this.getIcon.bind(this);
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  handleHover(event) {
    $(event.target).css('background-color', '#ccc');
  }

  handleLeave(event) {
    $(event.target).css('background-color', 'white');
  }

  download(event) {
    const { endpoint, file  } = this.props;
    const target = $(event.target).parent().find('.spinner')[0];
    const opts = {
      lines: 13,
      length: 28,
      width: 14,
      radius: 42,
      scale: 0.5,
      corners: 1,
      color: '#000',
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      className: 'spinner',
      bottom: '50%',
      left: '50%',
      shadow: false,
      hwaccel: false,
      position: 'absolute'
    };

    var spinner = new Spinner(opts).spin(target);
    const close = this.close;
    const data = $(event.target).parent().find('form').serialize();

    $.ajax({
      url: endpoint,
      type: 'POST',
      data: data,
      complete: function(data) {
        spinner.stop()
        close()
      }
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

  getIcon() {
    const { iconStyle } = this.props
    let ext = this.props.file.name.split('.')[this.props.file.name.split('.').length -1]
    var icon = iconStyle['_blank'];
    for(let attr in iconStyle) {
      if(ext == attr) {
        icon = iconStyle[attr]
        break
      }
    }
    return icon
  }

  render() {

    const { file, endpoint, style, iconStyle } = this.props;
    
    const filesize = this.formatFileSize(file.size)

    const icon = this.getIcon()

    return (
      <div style={style.imko}>
      <div onClick={this.open} style={Object.assign({}, icon, iconStyle.default)} onMouseOver={this.handleHover} onMouseLeave={this.handleLeave}>
        {file.name}        
      </div>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header style={style.modal} closeButton>
          <Modal.Title style={style.modal}>{file.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={style.modal}>
          <div style={Object.assign({}, icon, iconStyle.default)}>
            {file.name}
          </div>
          <div style={style.modal}>
            Filesize: {filesize}<br/>
            Date: {file.server_modified} 
          </div>
        </Modal.Body>
        <Modal.Footer style={style.modal}>
          <div className='spinner' style={{marginLeft: '50%'}}></div>
          <form style={{float: 'right'}} action={endpoint} method="post" onSubmit={this.download}>
            <input className="btn btn-primary" type="submit" value="Download" />
            <input type="hidden" name="download" value={file.path_lower} />
          </form>
          <Button style={{float: 'left'}}  onClick={this.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}


DownloadFile.propTypes = propTypes;
DownloadFile.defaultProps = defaultProps;

export default DownloadFile
