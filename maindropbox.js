import React from 'react';
import ReactDOM from 'react-dom';
import DropboxContainer from './components/dropboxcontainer.js';
import CollapseFolderGroup from './components/collapsefoldergroup.js';
import CollapseFolder from './components/collapsefolder.js';

const node = document.getElementById('dropbox-container');

const pathnameParts = window.location.pathname.split('/')

const config = {};

config.title  = pathnameParts[pathnameParts.length - 2]
config.language = pathnameParts[pathnameParts.length - 1] 

const dropboxOpts = JSON.parse(node.getAttribute('dropboxOpts'));

for(let param in dropboxOpts) {
  console.log(param, dropboxOpts[param]);
  config[param] = dropboxOpts[param];
}

console.log(dropboxOpts);
console.log(dropboxOpts.foo);

ReactDOM.render(<DropboxContainer config={config} datasource="/dropbox/data"/>, node);
