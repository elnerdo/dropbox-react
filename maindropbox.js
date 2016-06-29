import React from 'react';
import ReactDOM from 'react-dom';
import DropboxContainer from './components/dropboxcontainer.js';
import CollapseFolderGroup from './components/collapsefoldergroup.js';
import CollapseFolder from './components/collapsefolder.js';


const node = document.getElementById('dropbox-container');
const pathnameParts = window.location.pathname.split('/')

var config = {};

config.path = node.getAttribute('path');
config.language = node.getAttribute('language');
config.filter = JSON.parse(node.getAttribute('filter'));
config.map = JSON.parse(node.getAttribute('map'));

let host = window.location.hostname
let dataroute = '/dropbox/data'

let datasource = host + dataroute

ReactDOM.render(<DropboxContainer config={config} datasource={datasource}/>, node);
