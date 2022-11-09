import React, {Component} from 'react';
import {Table} from '@finos/perspective';
import {ServerRespond} from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
interface IProps {
    data: ServerRespond[],
}

/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
interface PerspectiveViewerElement extends HTMLElement {
    load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
    // Perspective table
    table: Table | undefined;

    render() {
        return React.createElement('perspective-viewer');
    }

    componentDidMount() {
        // Get element to attach the table from the DOM.
        const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

        const schema = {
            stock: 'string',
            top_ask_price: 'float',
            top_bid_price: 'float',
            timestamp: 'date',
        };

<<<<<<< Updated upstream
        if (window.perspective && window.perspective.worker()) {
            this.table = window.perspective.worker().table(schema);
        }
        if (this.table) {
            // Load the `table` in the `<perspective-viewer>` DOM reference.

            // Add more Perspective configurations here.
            elem.load(this.table);
            elem.setAttribute("view", "y_line");
            elem.setAttribute("column-pivots", '["stock"]');
            elem.setAttribute("row_pivots", '["timestamp"]');
            elem.setAttribute("columns", '["top_ask_price"]');
            elem.setAttribute("aggregates",
                '{"stock":"distinct_count", "top_ask_price":"avg", "top_bid_price":"avg", "timestamp":"distinct_count"}'
            );
        }
=======
    const schema = {
      stock: 'string',
      price_abc: 'float',
      price_def: 'float',
      ratio:'float',
      timestamp: 'date',
      upper_bound:'float',
      lower_bound:'float',
      trigger_alert:'float',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      elem.load(this.table);
      elem.setAttribute('view', 'y_line');
      elem.setAttribute('column-pivots', '["stock"]');
      elem.setAttribute('row-pivots', '["timestamp"]');
      elem.setAttribute('columns', '["top_ask_price"]');
      elem.setAttribute('aggregates', JSON.stringify({
        stock: 'distinctcount',
        price_abc: 'avg',
        price_def: 'avg',
        ratio:'avg',
        timestamp: 'distinct count',
        upper_bound:'avg',
        lower_bound:'avg',
        trigger_alert:'avg',
      }));
>>>>>>> Stashed changes
    }

<<<<<<< Updated upstream
    componentDidUpdate() {
        // Everytime the data props is updated, insert the data into Perspective table
        if (this.table) {
            // As part of the task, you need to fix the way we update the data props to
            // avoid inserting duplicated entries into Perspective table again.
            this.table.update(this.props.data.map((el: any) => {
                // Format the data from ServerRespond to the schema
                return {
                    stock: el.stock,
                    top_ask_price: el.top_ask && el.top_ask.price || 0,
                    top_bid_price: el.top_bid && el.top_bid.price || 0,
                    timestamp: el.timestamp,
                };
            }));
        }
=======
  componentDidUpdate() {
    if (this.table) {
      this.table.update([
        DataManipulator.generateRow(this.props.data),  
      ] as unknown as TableData);
>>>>>>> Stashed changes
    }
}

export default Graph;
