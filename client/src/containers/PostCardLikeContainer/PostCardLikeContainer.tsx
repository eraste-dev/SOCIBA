import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectRecentLikeds,
  selectRecentRemoveds,
  removeLikedByPostId,
  addNewLikedByPostId,
} from "app/reducer/postLikes/postLikes";

import { PostDataType } from "data/types";
import PostCardLikeAction, {
  PostCardLikeActionProps,
} from "components/PostCard/PostCardLikeAction/PostCardLikeAction";
import { IProduct } from "app/reducer/products/product";

export interface PostCardLikeContainerProps
  extends Omit<PostCardLikeActionProps, "isLiked" | "likeCount"> {
  like: IProduct["isLiked"];
}

const PostCardLikeContainer: FC<PostCardLikeContainerProps> = ({
  like,
  postId,
  onClickLike,
  ...args
}) => {
  const recentLikeds = useAppSelector(selectRecentLikeds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const dispatch = useAppDispatch();

  const isLiked = () => {
    if (recentLikeds.includes(postId)) {
      return true;
    }
    if (like && !recentRemoveds.includes(postId)) {
      return true;
    }
    return false;
  };

  const getLikeCount = (): number => {
    // Recent Liked
    // if (recentLikeds.includes(postId)) {
    //   return like.count + 1;
    // }
    // if (like.isLiked && recentRemoveds.includes(postId)) {
    //   return like.count - 1;
    // }
    // return like.count;
    return 55;
  };

  const handleClickLike = () => {
    if (isLiked()) {
      dispatch(removeLikedByPostId(postId));
    } else {
      dispatch(addNewLikedByPostId(postId));
    }
    onClickLike && onClickLike(postId);
  };

  return (
    <PostCardLikeAction
      {...args}
      isLiked={isLiked()}
      likeCount={getLikeCount()}
      postId={postId}
      onClickLike={handleClickLike}
    />
  );
};

export default PostCardLikeContainer;
