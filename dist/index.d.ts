import { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
declare type Props = {
    className?: string;
    src: string;
};
export default class GraphQLCodeBlock extends Component<Props> {
    static propTypes: {
        src: PropTypes.Validator<string>;
        className: PropTypes.Requireable<string>;
    };
    render(): JSX.Element;
}
export {};
