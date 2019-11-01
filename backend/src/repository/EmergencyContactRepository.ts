import { EntityRepository, Repository } from 'typeorm'

import EmergencyContact from '@/entity/EmergencyContact'

@EntityRepository(EmergencyContact)
class EmergencyContactRepository extends Repository<EmergencyContact> {

}

export default EmergencyContactRepository