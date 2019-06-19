import ListItem from '@material-ui/core/ListItem';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

import { withRouter } from 'infrastructure/navigation/History';
import itemsStore from 'infrastructure/repositories/items/itemsStore';
import Box from 'infrastructure/shared/Box';
import { ADD_ITEMS_DETAILS, PICK_ITEM } from 'features/AddOrder/constants';
import overviewController from 'features/AddOrder/components/Overview/controller';
import detailsController from 'features/AddOrder/components/Details/controller';
import detailsStore from 'features/AddOrder/components/Details/store';

@observer
class Item extends Component {
  constructor(props) {
    super(props);
    autoBind(this, ['handleClick']);
  }

  handleClick() {
    const { history, itemId } = this.props;
    const { friendlyUrl } = itemsStore.items.get(itemId);

    overviewController.resetTab();
    detailsController.reset();
    detailsStore.setCurrentItemId(itemId);
    history.push(ADD_ITEMS_DETAILS.replace(':friendlyUrl', friendlyUrl), {
      from: PICK_ITEM
    });
  }

  render() {
    const { children } = this.props;
    return (
      <Box width={1}>
        <ListItem component="div" button onClick={this.handleClick}>
          {children}
        </ListItem>
      </Box>
    );
  }
}

export default withRouter(Item);
