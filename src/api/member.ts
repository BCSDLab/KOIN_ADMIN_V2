import accessClient from 'api';
import {
  MembersParam, MembersResponse, Member, DeleteMemberResponse,
} from 'model/member.model';

export const getMemberList = async ({ page, track, is_deleted }: MembersParam) => {
  const response = await accessClient.get<MembersResponse>(`admin/members?page=${page}&track=${track}&limit=50&is_deleted=${is_deleted}`);
  return response.data;
};

export const getMember = async (id: number) => {
  const response = await accessClient.get<Member>(`admin/members/${id}`);
  return response.data;
};

export const updateMember = async (data: Partial<Member>) => {
  const { id, ...body } = data;
  const response = await accessClient.put<void>(`admin/members/${data.id}`, body);
  return response.data;
};

export const deleteMember = async (id: number) => {
  const response = await accessClient.delete<DeleteMemberResponse>(`admin/members/${id}`);
  return response.data;
};

export const addMember = async (body: Partial<Member>) => {
  const response = await accessClient.post<Member>('admin/members', body);
  return response.data;
};

export const undeleteMember = async (id: number) => {
  const response = await accessClient.post<void>(`admin/members/${id}/undelete`);
  return response.data;
};
