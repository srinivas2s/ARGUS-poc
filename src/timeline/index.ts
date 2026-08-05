import { argusStore } from '../lib/store';

export const TimelineEngineService = {
  getEvents: () => argusStore.timeline
};
