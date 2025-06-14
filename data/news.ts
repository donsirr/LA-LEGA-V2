export interface NewsArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  content?: string
  image: string
  category: string
  author: string
  date: string
  featured: boolean
  tags: string[]
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Volleyball Stars Secure Dramatic Win in VNL 2025 Thriller",
    slug: "volleyball-stars-secure-dramatic-win",
    excerpt:
      "Alex Johnson's 31-point performance leads Volleyball Stars to a thrilling five-set victory over Power Spikers in a match that showcased the best of modern volleyball.",
    content:
      'In a match that will be remembered as one of the most exciting of the VNL 2025 season, Volleyball Stars secured a dramatic five-set victory over Power Spikers, with Alex Johnson delivering a stellar 31-point performance.\n\nThe match, which lasted over two and a half hours, saw momentum swing back and forth between the two powerhouse teams. Johnson\'s attacking prowess was on full display as he converted 28 of his 45 attack attempts, adding 2 blocks and an ace to complete his impressive stat line.\n\n"This was a team effort," Johnson said after the match. "We knew Power Spikers would be tough, especially with Kenji Tanaka in great form, but we stuck to our game plan and fought for every point."\n\nCoach Williams praised his team\'s resilience: "When we were down in the fourth set, I saw something special in the eyes of our players. They refused to give up, and that mental strength made the difference today."\n\nThe victory moves Volleyball Stars to second place in the VNL standings, setting up a crucial match against league leaders Volleyball Legends next week.',
    image: "/placeholder.svg?height=600&width=800",
    category: "Match Reports",
    author: "Michael Chen",
    date: "2025-06-12T15:30:00Z",
    featured: true,
    tags: ["VNL", "Volleyball Stars", "Power Spikers", "Alex Johnson"],
  },
  {
    id: 2,
    title: "Maria Rodriguez Named MVP of the Month After Record-Breaking Performance",
    slug: "maria-rodriguez-mvp-month",
    excerpt:
      "Victory Volleyball's star setter Maria Rodriguez has been named MVP of the month after breaking the record for most assists in a single match.",
    content:
      'Victory Volleyball\'s star setter Maria Rodriguez has been named MVP of the month after her record-breaking performance against Defense Masters, where she recorded an unprecedented 68 assists in a single match.\n\nRodriguez, who has been in exceptional form throughout the season, has been instrumental in Victory Volleyball\'s rise to the top of the World Championship standings. Her precision setting and tactical awareness have transformed the team\'s offensive capabilities.\n\n"Maria sees the game differently," said Victory Volleyball head coach Carlos Mendez. "Her ability to read the block and make split-second decisions gives our attackers a significant advantage."\n\nThe 27-year-old Brazilian has also contributed significantly in defense, averaging 2.8 digs per set and maintaining a 42% excellent reception rate.\n\n"I\'m honored to receive this award, but volleyball is always about the team," Rodriguez said during the award ceremony. "My job is to create opportunities for our attackers, and they\'ve been converting at an incredible rate."\n\nWith the World Championship playoffs approaching, Rodriguez\'s form will be crucial to Victory Volleyball\'s championship aspirations.',
    image: "/placeholder.svg?height=400&width=600",
    category: "Awards",
    author: "Sarah Johnson",
    date: "2025-06-10T09:15:00Z",
    featured: false,
    tags: ["Maria Rodriguez", "Victory Volleyball", "MVP", "World Championship"],
  },
  {
    id: 3,
    title: "Global Spikers Announce New Training Facility Opening in Seoul",
    slug: "global-spikers-new-facility",
    excerpt:
      "Global Spikers have unveiled plans for a state-of-the-art training facility in Seoul, featuring cutting-edge technology and recovery amenities for players.",
    content:
      'Global Spikers have announced the opening of a new state-of-the-art training facility in Seoul, representing a significant investment in the team\'s future and development of volleyball in South Korea.\n\nThe facility, which will span over 10,000 square meters, includes six competition-standard courts, a comprehensive strength and conditioning center, and cutting-edge recovery amenities including cryotherapy chambers and hydrotherapy pools.\n\n"This facility represents our commitment to excellence," said Global Spikers president Kim Sung-ho. "We\'re not just building for our current team but investing in the future of volleyball in our country."\n\nA unique feature of the new complex is the performance analysis center, equipped with motion-capture technology and AI-powered analytics tools to help players and coaches optimize technique and strategy.\n\nSophia Kim, the team\'s star outside hitter, expressed her excitement: "Having access to this level of technology and support will help us compete with the best teams in the world. The recovery facilities will be particularly valuable during the intense competition schedule."\n\nThe facility is expected to be completed by December 2025 and will also serve as a training hub for youth development programs.',
    image: "/placeholder.svg?height=400&width=600",
    category: "Team News",
    author: "David Park",
    date: "2025-06-08T14:45:00Z",
    featured: false,
    tags: ["Global Spikers", "Training Facility", "Seoul", "Development"],
  },
  {
    id: 4,
    title: "Rule Changes Announced for Upcoming International Volleyball Season",
    slug: "rule-changes-international-volleyball",
    excerpt:
      "The International Volleyball Federation has announced several rule modifications aimed at speeding up the game and enhancing the spectator experience.",
    content:
      'The International Volleyball Federation (IVF) has announced several rule changes for the upcoming season, aimed at increasing the pace of play and enhancing the spectator experience.\n\nAmong the most significant changes is the reduction of the service time from 8 seconds to 5 seconds, which officials believe will create a more dynamic game flow. Additionally, the new rules will allow coaches to challenge line calls and net touches using video review.\n\n"These changes reflect our commitment to evolving the sport while maintaining its integrity," said IVF President Jean-Pierre Dubois. "We\'ve carefully considered feedback from players, coaches, and fans to make volleyball even more exciting."\n\nAnother notable change is the introduction of a 30-second technical timeout when a team reaches 15 points in the deciding set, replacing the current system of team-called timeouts in the final set.\n\nReaction from the volleyball community has been mixed. Volleyball Legends coach Antonio Rossi expressed concerns: "While I understand the desire to speed up the game, reducing the service time puts additional pressure on servers and might affect the quality of serves."\n\nIn contrast, Volleyball Stars captain Alex Johnson welcomed the changes: "The video challenge system is a positive step forward. Getting crucial calls right can make all the difference in close matches."\n\nThe new rules will be implemented starting with the International League tournament in August 2025.',
    image: "/placeholder.svg?height=400&width=600",
    category: "Volleyball News",
    author: "Emma Wilson",
    date: "2025-06-06T11:20:00Z",
    featured: false,
    tags: ["Rules", "IVF", "International Volleyball", "Changes"],
  },
  {
    id: 5,
    title: "Rising Star Kenji Tanaka Signs Contract Extension with Power Spikers",
    slug: "kenji-tanaka-contract-extension",
    excerpt:
      "Middle blocker Kenji Tanaka has committed his future to Power Spikers by signing a three-year contract extension following his breakthrough season.",
    content:
      'Power Spikers have secured the future of rising star Kenji Tanaka, with the middle blocker signing a three-year contract extension that will keep him with the team until 2028.\n\nTanaka, who has emerged as one of the most dominant middle blockers in the Asian Championship, led the league in blocks last season with an average of 1.8 per set and maintained an impressive 58% attack efficiency.\n\n"Staying with Power Spikers was an easy decision," Tanaka said at the press conference announcing his extension. "The team has supported my development from day one, and I believe we have the potential to win multiple championships in the coming years."\n\nThe 29-year-old Japanese international has been instrumental in Power Spikers\' rise to prominence, helping them secure their first Asian Championship title last season.\n\nTeam manager Hiroshi Yamamoto expressed his satisfaction with the deal: "Kenji embodies everything we value in our players – technical excellence, leadership, and dedication. Building our team around his presence at the net gives us a strong foundation for success."\n\nThe contract extension ends speculation about Tanaka potentially moving to the International League, with several European teams reportedly showing interest in the middle blocker.',
    image: "/placeholder.svg?height=400&width=600",
    category: "Transfers",
    author: "Takashi Yamamoto",
    date: "2025-06-04T16:50:00Z",
    featured: false,
    tags: ["Kenji Tanaka", "Power Spikers", "Contract", "Asian Championship"],
  },
  {
    id: 6,
    title: "Volleyball Legends Announce Charity Tournament to Support Youth Development",
    slug: "volleyball-legends-charity-tournament",
    excerpt:
      "Volleyball Legends will host a charity tournament featuring current and former players to raise funds for youth volleyball programs in underserved communities.",
    content:
      'Volleyball Legends have announced they will host a charity tournament next month to raise funds for youth volleyball development programs in underserved communities across South America.\n\nThe event, titled "Legends for the Future," will feature exhibition matches between current team members and volleyball legends from previous generations, providing fans with a unique opportunity to see past and present stars compete together.\n\n"Giving back to the community has always been a core value for our organization," said Carlos Mendez, team captain and event organizer. "Many of us benefited from youth programs when we were starting out, and we want to ensure the next generation has even better opportunities."\n\nThe funds raised will support the construction of volleyball courts in schools, provide equipment to community centers, and establish coaching programs in regions with limited access to sports facilities.\n\nFormer Volleyball Legends captain Roberto Gonzalez, who led the team to three consecutive championships between 2015-2017, will return to the court for the event: "When Carlos called me about this initiative, I immediately said yes. The chance to play again in front of our fans while supporting such an important cause is truly special."\n\nThe tournament will be held on July 15-16 at the Buenos Aires Olympic Stadium, with tickets going on sale next week. All proceeds will go directly to the Volleyball Legends Foundation\'s youth development fund.',
    image: "/placeholder.svg?height=400&width=600",
    category: "Community",
    author: "Isabella Martinez",
    date: "2025-06-02T13:10:00Z",
    featured: false,
    tags: ["Volleyball Legends", "Charity", "Youth Development", "Community"],
  },
  {
    id: 7,
    title: "Defense Masters Introduce Revolutionary Training Methods Using VR Technology",
    slug: "defense-masters-vr-training",
    excerpt:
      "Defense Masters have become the first volleyball team to incorporate virtual reality into their training regimen, allowing players to practice reaction time and positioning.",
    content:
      'Defense Masters have pioneered a new approach to volleyball training by integrating virtual reality technology into their practice sessions, becoming the first professional team to adopt this innovative method.\n\nThe VR system, developed in collaboration with sports technology company TechMotion, allows players to practice reaction time, positioning, and decision-making in simulated game scenarios that can be customized to focus on specific skills.\n\n"VR training gives us the ability to create thousands of repetitions of game-like situations without the physical toll on players\' bodies," explained Defense Masters head coach Robert Thompson. "It\'s particularly valuable for defensive specialists and liberos who rely heavily on read-and-react skills."\n\nEmma Wilson, the team\'s star libero, has been one of the biggest advocates for the new technology: "The system can replicate the attacking patterns of specific opponents, which helps us prepare more effectively for matches. I\'ve noticed significant improvements in my anticipation since we started using it."\n\nThe VR training program includes modules for serve reception, block positioning, and defensive coverage, with the system providing immediate feedback on player decisions and movements.\n\nSports scientists monitoring the program have reported promising early results, with players showing improved reaction times and more consistent positioning in actual matches.\n\n"This is just the beginning," said Thompson. "As the technology evolves, we see potential for even more sophisticated applications that could revolutionize how volleyball skills are developed at all levels."',
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
    author: "Robert Chen",
    date: "2025-05-30T10:25:00Z",
    featured: false,
    tags: ["Defense Masters", "Virtual Reality", "Training", "Technology"],
  },
  {
    id: 8,
    title: "International Volleyball Federation Announces Expansion of VNL to Include More Teams",
    slug: "ivf-vnl-expansion",
    excerpt:
      "The International Volleyball Federation has revealed plans to expand the Volleyball Nations League from 16 to 20 teams starting in the 2026 season.",
    content:
      'The International Volleyball Federation (IVF) has announced plans to expand the Volleyball Nations League (VNL) from 16 to 20 teams beginning with the 2026 season, marking a significant growth for the premier international volleyball competition.\n\nThe expansion will create opportunities for emerging volleyball nations to compete at the highest level, with qualification tournaments to be held in late 2025 to determine the four additional teams.\n\n"This expansion represents our commitment to growing volleyball globally," said IVF President Jean-Pierre Dubois. "By including more teams in our flagship competition, we\'re providing a pathway for developing nations to test themselves against the world\'s best."\n\nThe expanded format will maintain the round-robin preliminary round but will feature five pools of four teams each, with the top eight teams advancing to the finals. The competition window will be extended by one week to accommodate the additional matches.\n\nVolleyball analysts have generally welcomed the announcement, noting that it strikes a balance between growth and maintaining the quality of competition.\n\n"The VNL has established itself as a premier volleyball event in just a few years," said volleyball commentator Maria Gonzalez. "This expansion comes at the right time, when we\'re seeing improved standards in countries that haven\'t traditionally been volleyball powerhouses."\n\nThe IVF also confirmed that the expanded VNL will continue to serve as a qualification pathway for the 2028 Olympic Games in Los Angeles.',
    image: "/placeholder.svg?height=400&width=600",
    category: "Volleyball News",
    author: "Jean Dubois",
    date: "2025-05-28T08:40:00Z",
    featured: false,
    tags: ["VNL", "Expansion", "IVF", "International Volleyball"],
  },
]
