import { EntityRepository } from 'typeorm'

import { BaseRepository } from './BaseRepocitory'
import IndustryCategory from '@/entity/IndustryCategory'

@EntityRepository(IndustryCategory)
class IndustryCategoryRepository extends BaseRepository<IndustryCategory> {
    
}

export default IndustryCategoryRepository