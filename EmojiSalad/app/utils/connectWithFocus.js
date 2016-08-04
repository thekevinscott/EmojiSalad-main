import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppState,
} from 'react-native';

// There's four ways componentWillFocus will get called:
// 1) componentWillMount
// 2) AppState goes from background to active
// 3) Websocket goes away, and then reconnects
// 4) push / shift in navigation stage
//
// For #1, we simply monkey patch componentWillMount, and call componentWillFocus
// For #2, we add listeners, in componentWillMount and unMount, to listen for AppState changes, ONLY if its the right scene
// For #3 and #4, we need to set up reducers that listen for those changes, and monkey
// patch mapStateToProps to return those bits of state. Then, we need to listen to
// componentWillReceiveProps and determine whether either of those is changing.
//
function getWrappedComponent(
  component,
  [
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options,
  ],
) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    {
      ...options,
      withRef: true,
    },
  )(component);
}

export default function connectWithFocus(...args) {
  return component => {
    const componentName = component.name;
    const mapStateToProps = ({ router }) => {
      const {
        scene,
        websocket,
      } = router;

      return {
        activeComponent: (scene || {}).title,
        websocketConnected: (websocket || {}).connected,
      };
    };

    const WrappedComponent = getWrappedComponent(component, args);

    class WrapperComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          mounted: false,
          handledMounted: false,
          appState: null,
        };
        this.refHandler = this.refHandler.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.componentWillFocus = this.componentWillFocus.bind(this);
      }

      componentWillMount() {
        this.setState({
          mounted: true,
        });
        console.log('component will mount', componentName);
        this.componentWillFocus();
        AppState.addEventListener('change', this.handleAppStateChange);
      }

      componentWillFocus() {
        if (this.instance) {
          console.log('instance valid', componentName);
          if (!this.instance.componentWillFocus) {
            console.warn('You called connectFocus with a component that failed to implement componentWillFocus', this.instance);
          } else {
            this.instance.componentWillFocus();
          }
        }
      }

      componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
      }

      isComponentActive() {
        // If there's no active component, we're on the initial route.
        // If there *is* an active component, we should check that it
        // matches the current component, as a sanity check.
        if (this.props.activeComponent) {
          return this.props.activeComponent === componentName;
        }
        return true;
      }

      willComponentBecomeFocused(nextProps) {
        // If there's no active component, we're on the initial route.
        // That means that componentWillMount, or refHandler below,
        // caught the initial focus event, so we can safely ignore it
        // here.
        if (this.props.activeComponent) {
          // check that this component is not already active
          // and check that the correct component is being handle;
          return this.props.activeComponent !== nextProps.activeComponent && nextProps.activeComponent === componentName;
        }
        return false;
      }

      willWebsocketBecomeActive(nextProps) {
        // make sure the component is active
        if (this.isComponentActive()) {
          // only focus if we're coming from a websocket-unconnected state
          // and we're going to a websocket-connected state
          return this.props.websocketConnected === false && nextProps.websocketConnected === true;
        }
        return false;
      }

      componentWillReceiveProps(nextProps) {
        console.log('next props', this.props, nextProps);
        if (
          this.willComponentBecomeFocused(nextProps) ||
          this.willWebsocketBecomeActive(nextProps)
        ) {
          console.log(componentName, 'websocket or navigation change, send off focus');
          this.componentWillFocus();
        }
      }

      handleAppStateChange(newAppState) {
        if (this.state.appState !== newAppState && newAppState === 'active' && this.props.activeComponent === componentName) {
          console.log('app change, focus on', componentName);
          this.componentWillFocus();
        }
        this.setState({
          appState: newAppState,
        });
      }

      refHandler(c) {
        if (!this.instance) {
          this.instance = c.getWrappedInstance();
          // we might already be mounted
          if (this.state.mounted && !this.state.handleMounted) {
            console.log(componentName, 'just got ref, send off comp will focus');
            this.setState({
              handleMounted: false,
            });
            this.componentWillFocus();
          }
        }
      }
      render() {
        return (
          <WrappedComponent
            {...this.props}
            ref={this.refHandler}
          />
        );
      }
    }
    return connect(
      mapStateToProps
    )(WrapperComponent);
  };
}
