import React, { Component } from 'react'

export default function LazyLoadComponent(getComponent) {
    class AsyncComponent extends Component {
        static Component = null;
        state = {
            Component: AsyncComponent.Component
        };
        componentDidMount(prevProps, prevState) {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component })
                })
            }
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            return null;
        }
    }
    return AsyncComponent;
}


