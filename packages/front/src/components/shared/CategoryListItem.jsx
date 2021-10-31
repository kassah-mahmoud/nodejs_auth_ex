import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const CategoryListItem = ({ classes, category, onOpenProductForm }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={category.name} />
        <ListItemIcon>
          <img className="rounded-full w-16" src={`/${category.image}`} />
        </ListItemIcon>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader component="div" id="products">
              <div className="w-full flex justify-between">
                <span>Products</span>
                <IconButton
                  onClick={() => {
                    onOpenProductForm(category.id);
                  }}
                  color="primary"
                  aria-label="add to shopping cart"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </div>
            </ListSubheader>
          }
        >
          {(category.products || []).map((product) => (
            <ListItem className={classes.nested}>
              <ListItemAvatar>
                <Avatar>
                  <img className="w-16" src={`/${product.image}`} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`${product.price} $`}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CategoryListItem;
