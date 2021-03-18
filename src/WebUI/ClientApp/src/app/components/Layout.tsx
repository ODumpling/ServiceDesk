import React, {Component, ReactNode} from 'react';
import Menu from "./api-authorization/Menu";

function Container(props: { children: ReactNode }) {
    return (
        <div className="container mx-auto">
            {props.children}
        </div>
    );
}

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <Menu/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
