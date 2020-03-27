# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Grave.create(name: "Tom", epitaph: "He lived a long time", lifespan: "1723-1902", open: false)
Grave.create(name: "Mavi", epitaph: "He OLO.", lifespan: "420-69", open: false)
Grave.create(name: "Jebediah Springfield", epitaph: "A noble spirit embiggens the smallest man.", lifespan: "1774-1831", open: false)
Grave.create(name: "Paul McCartney", epitaph: "Paul is Dead", lifespan: "1942-1966", open: false)
Grave.create(name: "Margaret Thatcher", epitaph: "Once there was a wicked witch in the lovely land of Oz", lifespan: "1925-2013", open: false)
Grave.create(name: "George A. Romero", epitaph: "Father of the zombie film", lifespan: "1940-2017", open: false)
Grave.create(name: "Hanako", epitaph: "Rock 'n Roll NEVER DIES!", lifespan: "1979-1999", open: false)
Grave.create(name: "Kurt Kobrains", epitaph: "Misplaced own brains, need replacement", lifespan: "1967-1994", open: false)
Grave.create(name: "Li Wenliang", epitaph: "He tried to warn us.", lifespan: "1985-2020", open: false)
Grave.create(name: "Bill Murray", epitaph: "Local improvisational actor", lifespan: "1950-2021", open: false)
Grave.create(name: "Nick Frost", epitaph: "Non-local improvisational actor", lifespan: "1972-2021", open: false)

Corpse.create(name: "Tom", speed: 1, flowers_needed: 2, grave_id: 1)
Corpse.create(name: "Mavi", speed: 2, flowers_needed: 1, grave_id: 2)
Corpse.create(name: "Jebediah Springfield", speed: 1, flowers_needed: 2, grave_id: 3)
Corpse.create(name: "Paul McCartney", speed: 1.4, flowers_needed: 3, grave_id: 4)
Corpse.create(name: "Margaret Thatcher", speed: 1.1, flowers_needed: 1, grave_id: 5)
Corpse.create(name: "George A. Romero", speed: 1.8, flowers_needed: 1, grave_id: 6)
Corpse.create(name: "Hanako", speed: 1.3, flowers_needed: 1, grave_id: 7)
Corpse.create(name: "Kurt Kobrains", speed: 1.4, flowers_needed: 3, grave_id: 8)
Corpse.create(name: "Li Wenliang", speed: 1.6, flowers_needed: 2, grave_id: 9)
Corpse.create(name: "Bill Murray", speed: 1.5, flowers_needed: 3, grave_id: 10)
Corpse.create(name: "Nick Frost", speed: 1.9, flowers_needed: 1, grave_id: 11)