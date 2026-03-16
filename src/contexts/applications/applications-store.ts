import type { IApplication, IApplicationsStore, IApplicationsStoreState } from '@/types';

function isApplication(value: IApplication | undefined): value is IApplication {
  return Boolean(value);
}

const initialState: IApplicationsStoreState = {
  applicationsById: {},
  listIndexById: {},
  applicationIds: [],
  isLoading: false,
};

export function createApplicationsStore(initialValue: IApplicationsStoreState = initialState) {
  let state = initialValue;
  const listeners = new Set<() => void>();

  const store: IApplicationsStore = {
    getState: () => state,
    setState: (updater) => {
      const nextState = typeof updater === 'function' ? updater(state) : updater;

      if (Object.is(nextState, state)) {
        return;
      }

      state = nextState;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };

  return store;
}

export function toApplicationsStoreState(applications: IApplication[]) {
  const applicationsById: IApplicationsStoreState['applicationsById'] = {};
  const listIndexById: IApplicationsStoreState['listIndexById'] = {};
  const applicationIds: string[] = [];

  applications.forEach((application) => {
    applicationsById[application.id] = application;
    listIndexById[application.id] = application;
    applicationIds.push(application.id);
  });

  return {
    applicationsById,
    listIndexById,
    applicationIds,
    isLoading: false,
  } satisfies IApplicationsStoreState;
}

export function toApplicationsList(state: IApplicationsStoreState) {
  return state.applicationIds
    .map((applicationId) => state.applicationsById[applicationId])
    .filter(isApplication);
}
