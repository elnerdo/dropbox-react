import CollapseFolderGroup from '../components/collapsefoldergroup.js';
import CollapseFolder from '../components/collapsefolder.js';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';


describe("CollapseFolderGroup", () => {
  it("exists", () => {
  });

  it("contains child components (three)", () => {
    var folders = ["FolderA", "FolderB", "FolderC"]
    const wrapper = shallow(<CollapseFolderGroup folders={folders} />)
    expect(wrapper.contains([
    ])).to.equal(true)
  });
});
