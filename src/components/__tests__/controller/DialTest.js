import React from "react";
import renderer from 'react-test-renderer';
import Dial from "../../controller/Dial";

describe('DialComponent', () => {

  const testProps = {
    model: {
      id: "test-slider",
      parameter: "test-parameter",
      defaultValue: 2,
      minValue: 0,
      maxValue: 5,
      step: 0.1
    },
    changeCallback: jest.fn(() => ({})),
    snackbarCallback: jest.fn(() => ({}))
  }

  it('should render correctly', () => {
    const tree = renderer.create(
      <Dial {...testProps} />
    ).toJSON()

    expect(tree).toMatchSnapshot();
  });
});