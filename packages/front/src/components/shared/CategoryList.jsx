import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import CategoryListItem from "./CategoryListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CategoryList = ({ categories, onOpenProductForm }) => {
  const classes = useStyles();

  return (
    <div className="w-full">
      <h3 className="font-medium text-lg mt-6">Categories</h3>
      <List
        component="nav"
        aria-labelledby="categories"
        title="Categories"
        className={classes.root}
      >
        {(categories || []).map((category) => (
          <CategoryListItem
            classes={classes}
            category={category}
            onOpenProductForm={onOpenProductForm}
          />
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
