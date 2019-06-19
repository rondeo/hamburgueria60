import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { runInAction } from 'mobx';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import * as images from '../../assets/categories';
import controller from '../../controller';
import store from '../../store';
import ChooseTypeDialog, { chooseTypeDialog } from '../ChooseTypeDialog';

import { actions, floatWrapper, mediaContent } from './index.module.scss';

import Currency from 'infrastructure/i18n/components/Currency';
import { withRouter } from 'infrastructure/navigation/History';
import CopyIcon from 'infrastructure/shared/CopyIcon';
import overviewController from 'features/AddOrder/components/Overview/controller';
import { SENT } from 'infrastructure/repositories/orders/constants';

const opacity = 0.65;
const spacing = 8;

const useStyles = makeStyles({
  fab: { marginRight: 10 },
  media: { position: 'relative' },
  category: { opacity },
  title: { fontWeight: '300' },
  price: {
    textAlign: 'right',
    fontSize: 'x-large',
    marginTop: spacing * 2,
    marginBottom: spacing * 2,
    marginRight: 'auto'
  },
  divider: {
    marginTop: spacing,
    height: '2px',
    width: '25px',
    opacity,
    backgroundColor: 'white'
  }
});

const AddFab = function AddFab() {
  const handleClick = useCallback(() => {
    runInAction('chooseTypeDialog#open', () => {
      chooseTypeDialog.open.set(true);
    });
  });

  const classes = useStyles();

  return (
    <Fab
      classes={{ root: classes.fab }}
      size="large"
      color="secondary"
      onClick={handleClick}
      data-e2e="Banner#AddFab"
    >
      <AddShoppingCart />
    </Fab>
  );
};

const CopyFab = () => {
  const handleClick = useCallback(() => {
    const orderItem = controller.getOrderItem();
    controller.addCustomItem(orderItem.label.primary || 'Padrão');
  });
  return (
    <Observer>
      {() => (
        <Fab size="large" color="secondary" onClick={handleClick}>
          <CopyIcon />
        </Fab>
      )}
    </Observer>
  );
};

export default withRouter(function Banner() {
  const { status } = overviewController.getCurrentOrder();
  const item = controller.getCurrentItem();
  const classes = useStyles();

  return (
    <Observer>
      {() => (
        <div className={floatWrapper}>
          <Card>
            <CardMedia
              classes={{ root: classes.media }}
              image={images[item.categoryTag]}
            >
              <div className={mediaContent}>
                <Typography
                  classes={{ root: classes.title }}
                  variant="h6"
                  noWrap
                >
                  {item.name}
                </Typography>
                <Divider />
                <Typography
                  classes={{ root: classes.category }}
                  variant="overline"
                >
                  {item.categoryName}
                </Typography>

                <Typography classes={{ root: classes.price }} variant="h2">
                  <Currency value={item.price} />
                </Typography>
              </div>
            </CardMedia>
          </Card>
          <ChooseTypeDialog />
          {status !== SENT && (
            <CardActions className={actions}>
              {store.selectedOrderItemId ? <CopyFab /> : <AddFab />}
            </CardActions>
          )}
        </div>
      )}
    </Observer>
  );
});
