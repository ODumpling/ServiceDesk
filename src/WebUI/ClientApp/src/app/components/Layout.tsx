import React, {Component, ReactNode} from 'react';
import Menu from "../components/api-authorization/Menu";

function Container(props: { children: ReactNode }) {
    return (
        <div className="max-w-7xl px-8 mx-auto pt-6">
            {props.children}
        </div>
    );
}

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="h-screen bg-gray-100">
                <Menu/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
