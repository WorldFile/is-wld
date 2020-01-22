const { expect } = require('chai');
const { readFileSync } = require('fs');
const isWorldFile = require('../index.js');

describe('Checking URL', function() {
  it("Should identify URL ending in .gfw", function() {
    expect(isWorldFile('https://fakeurl/file.gfw')).to.equal(true);
  });
  it("Should identify URL ending in .jgw", function() {
    expect(isWorldFile('https://fakeurl/file.jgw')).to.equal(true);
  });
  it("Should identify URL ending in .j2w", function() {
    expect(isWorldFile('https://fakeurl/file.j2w')).to.equal(true);
  });
  it("Should identify URL ending in .pgw", function() {
    expect(isWorldFile('https://fakeurl/file.pgw')).to.equal(true);
  });
  it("Should identify URL ending in .tfw", function() {
    expect(isWorldFile('https://fakeurl/file.tfw')).to.equal(true);
  });
  it("Should identify URL ending in .wld", function() {
    expect(isWorldFile('https://fakeurl/file.wld')).to.equal(true);
  });
});

describe('Checking Binary Encodings', function() {
  it('Should identify file in Buffer Format', function() {
    const buffer = readFileSync('./test/data/gadas-export.pgw');
    expect(isWorldFile(buffer)).to.equal(true);
  });
  it('Should identify file in ArrayBuffer Format', function() {
    const data = readFileSync('./test/data/gadas-export.pgw');
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
    expect(isWorldFile(data)).to.equal(true);
  });
  it('Should identify file in Uint8Array Format', function() {
    const buffer = readFileSync('./test/data/gadas-export.pgw');
    const uint8Array = new Uint8Array(buffer);
    expect(isWorldFile(uint8Array)).to.equal(true);
  });
  it('Should identify file in DataView Format', function() {
    const data = readFileSync('./test/data/gadas-export.pgw');
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    const dataView = new DataView(arrayBuffer);
    expect(isWorldFile(dataView)).to.equal(true);
  });
})