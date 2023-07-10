import { getRequest } from "../request";
import { CommentType } from "@/utils/constant";
import type { IComment, IMultiPageBeforeConfig } from "@/types";
import type { AxiosResponse } from "axios";

enum REQUEST_URL {
  CommentHot = "/comment/hot",
  CommentNew = "/comment/new",
}

export enum CommentTrans {
  Hot = "hot",
  New = "new",
}

export interface ICommentNewParams {
  id: string | number;
  type: CommentType;
  pageNo?: number;
  pageSize?: number;
  sortType?: number;
  cursor?: string;
}

export interface ICommentHotParams extends IMultiPageBeforeConfig {
  id: string | number;
  type: CommentType;
}

/**
 * @description: 查询对应资源的评论
 */
export const getCommentNew = (params: ICommentNewParams) => {
  return getRequest(REQUEST_URL.CommentNew, params).then((res) =>
    translateComment(res, CommentTrans.New)
  );
};

function translateComment(res: AxiosResponse, type: CommentTrans) {
  let data = res.data;
  let total: any = 0;
  let cursor: any = "";
  let comments: any = [];

  if (type === CommentTrans.Hot) {
    total = data.total;
    cursor = data.cursor;
    comments = data.hotComments;
  } else if (type === CommentTrans.New) {
    data = data.data;
    total = data.totalCount;
    cursor = data.cursor;
    comments = data.comments;
  }

  const transComments: IComment[] = comments.map((comment: any) => {
    return {
      id: comment.commentId,
      nickname: comment.user.nickname,
      avatarUrl: comment.user.avatarUrl,
      content: comment.content,
      time: comment.time,
      likedCount: comment.likedCount,
      repliedNickname: comment.beReplied?.[0]?.user.nickname,
      repliedContent: comment.beReplied?.[0]?.content,
    };
  });

  return {
    total: total as number,
    cursor: cursor as string,
    comments: transComments,
  };
}
/**
 * @description: 查询对应资源热门评论
 */
export const getCommentHot = (params: ICommentHotParams) => {
  return getRequest(REQUEST_URL.CommentHot, params).then((res) =>
    translateComment(res, CommentTrans.Hot)
  );
};
