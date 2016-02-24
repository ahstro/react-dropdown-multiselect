'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class Dropdown extends React.Component {

  displayName: 'Dropdown'

  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || [],
      isOpen: false
    }
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value});
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUpdate(_newProps, newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  handleMouseDown(event) {

    if (event.type == 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  setValue(option) {
    let { selected } = this.state;
    let optionIndex = selected.indexOf(option);
    let newState = {
      selected: optionIndex === -1
        ? selected.concat(option)
        : selected.slice(0, optionIndex).concat(selected.slice(optionIndex + 1))
    };
    this.setState(newState);
  }

  renderOption (option) {
    let optionClass = classNames({
      'Dropdown-option': true,
      'is-selected': this.state.selected.indexOf(option) !== -1
    });

    return <div key={option.value} className={optionClass} onClick={this.setValue.bind(this, option)}>{option.label}</div>
  }

  buildMenu() {
    let ops = this.props.options.map((option) => {
      if (option.type == 'group') {
        let groupTitle = (<div className='title'>{option.name}</div>);
        let _options = option.items.map((item) => this.renderOption(item));

        return (
          <div className='group' key={option.name}>
            {groupTitle}
            {_options}
          </div>
        );
      } else {
        return this.renderOption(option);
      }
    })

    return ops.length ? ops : <div className='Dropdown-noresults'>No options found</div>;
  }

  handleDocumentClick(event) {
    if(this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({isOpen:false});
      }
    }
  }

  render() {
    const { className, controlClassName, menuClassName, placeholder, noPreview } = this.props;
    const { selected, isOpen } = this.state;
    let value = selected.map(option => option.label).join(', ');
    let menu = isOpen ? <div className={menuClassName}>{this.buildMenu()}</div> : null;

    let dropdownClass = classNames({
      'Dropdown': true,
      'is-open': isOpen
    }, className);

    return (
      <div className={dropdownClass}>
        <div className={controlClassName} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
          {(!noPreview && value) || placeholder || "Select..."}
          <span className='Dropdown-arrow' />
        </div>
        {menu}
      </div>
    );
  }

}
Dropdown.defaultProps = { controlClassName: 'Dropdown-control', menuClassName: 'Dropdown-menu'};
export default Dropdown;
