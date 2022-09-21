import UserService from "@/API/UserService";
import { IEvent } from "@/models/IEvent";
import { IUser } from "@/models/IUser";
import { AppDispatch } from "@/store";
import React from "react";
import { EventActionEnum, SetEventsAction, SetGuestsAction } from "./types";

export const EventActionCreators = {
  // Гости
  setGuests: (guests: IUser[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload: guests,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (e) {
      console.error(e);
    }
  },
  // События
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const eventsString = localStorage.getItem("events") || "[]";
      const events = JSON.parse(eventsString) as IEvent[];
      events.push(event);
      dispatch(EventActionCreators.setEvents(events));
      localStorage.setItem("events", JSON.stringify(events));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (author: string) => async (dispatch: AppDispatch) => {
    try {
      const eventsString = localStorage.getItem("events") || "[]";
      let events = JSON.parse(eventsString) as IEvent[];
      events = events.filter(
        (elem) => elem.author === author || elem.guest === author
      );
      dispatch(EventActionCreators.setEvents(events));
    } catch (e) {
      console.error(e);
    }
  },
  setEvents: (events: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload: events,
  }),
};
