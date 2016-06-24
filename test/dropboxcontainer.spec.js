import DropboxContainer from '../components/dropboxcontainer.js';
import CollapseFolderGroup from '../components/collapsefoldergroup.js';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe("<DropboxContainer />", () => {
  it("exists", () => {
  });

  it("property title gets rendered", () => {
    const wrapper = shallow(<DropboxContainer title="foo"/>)
    expect(wrapper.containsAllMatchingElements([
      <h3>foo</h3>
    ])).to.equal(true)
  });

  it("child components (two) get rendered", () => {
    var groups = ["GroupA", "GroupB"]
    const wrapper = shallow(<DropboxContainer title="foo" groups={groups}/>)
    expect(wrapper.contains([
      <CollapseFolderGroup />, <CollapseFolderGroup />
    ])).to.equal(true)
  });
});
