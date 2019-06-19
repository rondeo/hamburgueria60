import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Observer } from 'mobx-react';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

import { Grouping } from '../../helpers';
import Item from '../Item';
import ItemsSentinel from '../ItemsSentinel';
import Loading from '../Loading';
import pickItemStore from '../../store';

import { block, content } from './index.module.scss';

import Box from 'infrastructure/shared/Box';

const useStyles = makeStyles(theme =>
  createStyles({
    letter: {
      position: 'sticky',
      top: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(6),
      width: theme.spacing(6),
      boxSizing: 'border-box',
      padding: '7px',
      flex: '0 0 auto',
      color: theme.palette.primary.main
    },
    list: {
      width: '100%',
      display: 'flex',
      flexFlow: 'column'
    },
    gutters: theme.mixins.gutters(),
    box: {
      paddingRight: 0,
      marginLeft: theme.spacing(-2)
    }
  })
);

const Items = function Items() {
  const classes = useStyles();

  return (
    <Observer>
      {() => {
        const grouping = new Grouping({ items: pickItemStore.items });

        return grouping
          .onNewBlock(({ letter, content: blockContent }) => (
            <li className={block} key={`letter-${letter}`}>
              <Typography variant="h5" classes={{ root: classes.letter }}>
                {letter}
              </Typography>
              <div className={content}>{blockContent}</div>
            </li>
          ))
          .onExistingBlock(({ item }) => {
            const Container = React.Fragment;
            return (
              <Container key={item.id}>
                <Item itemId={item.id}>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ noWrap: true }}
                  />
                </Item>
              </Container>
            );
          })
          .buildComponent();
      }}
    </Observer>
  );
};

export default function Results() {
  const classes = useStyles();

  return (
    <Box className={[classes.box, classes.gutters]} ml="-12px">
      <List classes={{ root: classes.list }}>
        <Items />
        <ItemsSentinel />
        <Loading />
      </List>
    </Box>
  );
}
