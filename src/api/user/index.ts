import { getRequest } from "../request";
import type { IUser, IMenu, IMenuItem, IMultiPageConfig } from "@/types";
import type { AxiosResponse } from "axios";

enum REQUEST_URL {
  UserDetail = "/user/detail",
  UserPlaylist = "/user/playlist",
}

// 用户信息
export const getUserDetail = (params: { uid: string }) => {
  return getRequest(REQUEST_URL.UserDetail, params).then(
    (res: AxiosResponse): IUser => {
      const { profile } = res.data;

      return {
        userId: profile.userId,
        nickname: profile.nickname,
        avatarUrl: profile.avatarUrl,
      };
    }
  );
};

// 用户歌单
export const getUserPlaylist = (params: { uid: string } & IMultiPageConfig) => {
  return getRequest(REQUEST_URL.UserPlaylist, params).then(
    (res: AxiosResponse): IMenu[] => {
      const { playlist } = res.data
    
      const menus: IMenu[] = []
      const menuCreateList: IMenuItem[] = []
      const menuCollectList: IMenuItem[] = []
    
      const playlists: IMenuItem[] = playlist.map((playlist: any) => {
        return {
          name: playlist.name,
          icon: 'playlist',
          link: `/playlist/${playlist.id}`,
          id: playlist.id,
          userId: playlist.userId,
        }
      })
    
      playlists.splice(0, 1)
    
      playlists.forEach((playlist: IMenuItem) => {
        if (res.config.params.uid === playlist.userId) {
          menuCreateList.push(playlist)
        } else {
          menuCollectList.push(playlist)
        }
      })
    
      if (menuCreateList.length) {
        menus.push({
          name: '创建的歌单',
          children: menuCreateList,
        })
      }
    
      if (menuCollectList.length) {
        menus.push({
          name: '收藏的歌单',
          children: menuCollectList,
        })
      }
    
      return menus
    }
  );
};