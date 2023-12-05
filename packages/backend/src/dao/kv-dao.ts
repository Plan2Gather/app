import { TRPCError } from '@trpc/server';
import KvWrapper from './kv-wrapper';

import {
  GatheringBackendData,
  UserAvailability,
  gatheringBackendDataSchema,
  gatheringDataSchema,
} from '../types/schema';

const EXPIRATION_TTL = 60 * 60 * 24 * 7; // 7 days

export default class KVDAO {
  constructor(private gatheringsNamespace: KvWrapper) {}

  /**
   * Get a gathering.
   *
   * @param id - The ID of the gathering to get.
   * @returns - The gathering with the given ID.
   */
  getGathering(id: string) {
    // The backend data is gatheringBackendDataSchema, but we want to return the
    // data without the creationUserId.
    return this.gatheringsNamespace.get(gatheringDataSchema, id);
  }

  /**
   * Get a gathering with the creationUserId.
   * DO NOT USE THIS TO RETURN DATA TO THE USER.
   *
   * @param id - The ID of the gathering to get.
   * @returns - The gathering with the given ID.
   */
  getBackendGathering(id: string) {
    return this.gatheringsNamespace.get(gatheringBackendDataSchema, id);
  }

  /**
   * Add or update a gathering.
   * TODO: The TTL gets reset every time the gathering is updated
   *
   * @param gathering - The gathering to add/update.
   * @returns The gathering that was added/updated.
   */
  async putGathering(gathering: GatheringBackendData) {
    await this.gatheringsNamespace.put(
      gatheringBackendDataSchema,
      gathering.id,
      gathering,
      {
        expirationTtl: EXPIRATION_TTL,
      }
    );

    return gathering;
  }

  /**
   * Add or update a gathering's availability.
   *
   * @param id - The ID of the gathering to update.
   * @param availability - The availability to add/update.
   */
  async putAvailability(id: string, availability: UserAvailability) {
    const existingGathering = await this.getBackendGathering(id);

    if (!existingGathering) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Could not find gathering with id ${id}`,
      });
    }

    const gatheringWithAvailability: GatheringBackendData = {
      ...existingGathering,
      availability: {
        ...existingGathering.availability,
        ...availability,
      },
    };

    await this.putGathering(gatheringWithAvailability);
  }

  /**
   * Remove a gathering.
   *
   * @param id - The ID of the gathering to remove.
   */
  async removeGathering(id: string) {
    await this.gatheringsNamespace.delete(id);
  }
}
