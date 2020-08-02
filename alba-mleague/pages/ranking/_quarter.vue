<template>
  <div class="body">
    <div class="header">ALBA M.LEAGUE {{ quarter.toUpperCase() }}</div>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-burger" data-target="navMenu" v-bind:class="{ 'is-active': menuActive }" v-on:click="menuToggle()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" id="navMenu" v-bind:class="{ 'is-active': menuActive }">
        <div class="navbar-end">
          <nuxt-link to="/ranking/" class="navbar-item">TOTAL</nuxt-link>
          <nuxt-link to="/ranking/2020q1" class="navbar-item">2020Q1</nuxt-link>
          <nuxt-link to="/ranking/2020q2" class="navbar-item">2020Q2</nuxt-link>
          <nuxt-link to="/ranking/2020q3" class="navbar-item">2020Q3</nuxt-link>
      </div>
    </div>
    </nav>
    <div class="clcontent">
      <h2 class="title">
        <span lang="en">RANKING</span>
        <span lang="ja">ランキング</span>
      </h2>
      <div class="result-item">
        <ol class="result-rank-list">
          <li class="result-rank-item" v-for="(result, index) in ranking" v-bind:key="index">
            <div :class="getBadgeClass(index)">{{ index + 1 }}</div>
            <div class="result-rank-name">{{ result.player }}</div>
            <div class="result-rank-score">{{ result.point }}pt</div>
          </li>
        </ol>
      </div>
    </div>
    <div class="clcontent">
      <h2 class="title">
        <span lang="en">RESULTS</span>
        <span lang="ja">日程・結果</span>
      </h2>
      <div class="day-result" v-for="(dayResult, index) in results" v-bind:key="index">
        <h2 class="day">
          <span lang="ja">{{ dayResult.day }}</span>
        </h2>
        <div class="result-item">
          <ol class="result-rank-list">
            <li class="result-rank-item" v-for="(result, index2) in dayResult.results" v-bind:key="index2">
              <div :class="getBadgeClass(index2)">{{ index2 + 1 }}</div>
              <div class="result-rank-name">{{ result.player }}</div>
              <div class="result-rank-score">{{ result.point }}pt</div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import { Route } from "vue-router"

class Result {
  player: string
  point: number
  constructor(player: string, point: number) {
    this.player = player
    this.point = point
  }
}
class DayResult {
  day: string
  results: Result[]
  constructor(day: string, results: Result[]) {
    this.day = day
    this.results = results
  }
  isValid() {
    return this.results.reduce((sum, r) => sum + r.point, 0) == (this.results.length * 10)
  }
}

const quarterResults: { [key: string]: DayResult[] } = {
  "2020q3": [
    new DayResult("8/2 (日)", [
      new Result("稲田 翼", 113.5),
      new Result("北口 善紀", 25.5),
      new Result("石橋 享典", -1),
      new Result("竹澤 亮", -8),
      new Result("金子 侑起", -31),
      new Result("網 亮太朗", -39)
    ]),
    new DayResult("7/31 (金)", [
      new Result("北口 善紀", 121),
      new Result("清水 明彦", 83),
      new Result("石橋 享典", 80.5),
      new Result("足立 真陽", 15),
      new Result("網 亮太朗", -35),
      new Result("竹澤 亮", -51.5),
      new Result("島田 昴祐", -143)
    ]),
    new DayResult("7/24 (金)", [
      new Result("北口 善紀", 129.5),
      new Result("石橋 享典", 124.5),
      new Result("祖父江 尚也", 122),
      new Result("網 亮太朗", 106),
      new Result("稲田 翼", -72.5),
      new Result("清水 貴大", -131),
      new Result("金子 侑起", -208.5)
    ]),
    new DayResult("7/23 (木)", [
      new Result("足立 真陽", 148),
      new Result("網 亮太朗", 57),
      new Result("稲田 翼", -55),
      new Result("金子 侑起", -110)
    ]),
    new DayResult("7/22 (水)", [
      new Result("石橋 享典", 84.5),
      new Result("竹澤 亮", 76.5),
      new Result("金子 侑起", 49.5),
      new Result("足立 真陽", -3),
      new Result("網 亮太朗", -73.5),
      new Result("稲田 翼", -74)
    ]),
    new DayResult("7/17 (金)", [
      new Result("金子 侑起", 70.5),
      new Result("清水 明彦", 64),
      new Result("稲田 翼", -104.5)
    ]),
    new DayResult("7/11 (土)", [
      new Result("竹澤 亮", 229),
      new Result("足立 真陽", 58.5),
      new Result("金子 侑起", 20.5),
      new Result("清水 貴大", 15),
      new Result("北口 善紀", 13.5),
      new Result("稲田 翼", -9),
      new Result("清水 明彦", -65.5),
      new Result("網 亮太朗", -182)
    ]),
    new DayResult("7/10 (金)", [
      new Result("金子 侑起", 102.5),
      new Result("祖父江 尚也", 27),
      new Result("石橋 享典", -36),
      new Result("足立 真陽", -53.5)
    ]),
    new DayResult("7/3 (金)", [
      new Result("足立 真陽", 251.5),
      new Result("石橋 享典", 167.5),
      new Result("北口 善紀", 77),
      new Result("清水 明彦", 44.5),
      new Result("祖父江 尚也", 38.5),
      new Result("網 亮太朗", 21),
      new Result("金子 侑起", -49),
      new Result("竹澤 亮", -71.5),
      new Result("島田 昴祐", -389.5)
    ]),
  ],
  "2020q2": [
    new DayResult("6/28 (日)", [
      new Result("稲田 翼", 118),
      new Result("北口 善紀", 64),
      new Result("島田 昴祐", -152)
    ]),
    new DayResult("6/27 (土)", [
      new Result("北口 善紀", 397),
      new Result("稲田 翼", -25),
      new Result("竹澤 亮", -124),
      new Result("清水 明彦", -208)
    ]),
    new DayResult("6/26 (金)", [
      new Result("竹澤 亮", 125.5),
      new Result("石橋 享典", 68),
      new Result("網 亮太朗", -21),
      new Result("足立 真陽", -132.5)
    ]),
    new DayResult("6/14 (日)", [
      new Result("竹澤 亮", 228.5),
      new Result("網 亮太朗", 213.5),
      new Result("稲田 翼", 48),
      new Result("清水 明彦", -32.5),
      new Result("北口 善紀", -120.5),
      new Result("祖父江 尚也", -277)
    ]),
    new DayResult("6/13 (土)", [
      new Result("北口 善紀", 183),
      new Result("竹澤 亮", 114),
      new Result("清水 明彦", -71),
      new Result("網 亮太朗", -73),
      new Result("祖父江 尚也", -103)
    ]),
    new DayResult("5/31 (日)", [
      new Result("北口 善紀", 135),
      new Result("竹澤 亮", 119.5),
      new Result("金子 侑起", -11),
      new Result("清水 明彦", -45.5),
      new Result("祖父江 尚也", -53),
      new Result("足立 真陽", -85)
    ]),
    new DayResult("5/30 (土)", [
      new Result("北口 善紀", 69),
      new Result("金子 侑起", 18),
      new Result("網 亮太朗", 1.5),
      new Result("稲田 翼", -48.5)
    ]),
    new DayResult("5/29 (金)", [
      new Result("清水 明彦", 114.5),
      new Result("祖父江 尚也", 99.5),
      new Result("北口 善紀", -22),
      new Result("足立 真陽", -152)
    ]),
    new DayResult("5/24 (日)", [
      new Result("北口 善紀", 135.5),
      new Result("竹澤 亮", 69),
      new Result("稲田 翼", 68.5),
      new Result("網 亮太朗", 25),
      new Result("清水 明彦", 19.5),
      new Result("金子 侑起", -257.5)
    ]),
    new DayResult("5/23 (土)", [
      new Result("金子 侑起", 214),
      new Result("清水 明彦", 165),
      new Result("足立 真陽", 120),
      new Result("北口 善紀", 119.5),
      new Result("祖父江 尚也", 32),
      new Result("竹澤 亮", -69.5),
      new Result("網 亮太朗", -76.5),
      new Result("稲田 翼", -183.5),
      new Result("清水 貴大", -231)
    ]),
    new DayResult("5/22 (金)", [
      new Result("金子 侑起", 147),
      new Result("石橋 享典", 118.5),
      new Result("島田 昴祐", 56.5),
      new Result("北口 善紀", 3.5),
      new Result("足立 真陽", -28),
      new Result("清水 明彦", -93.5),
      new Result("網 亮太朗", -134)
    ]),
    new DayResult("5/19 (火)", [
      new Result("北口 善紀", 67.5),
      new Result("金子 侑起", 39),
      new Result("竹澤 亮", -9.5),
      new Result("網 亮太朗", -57)
    ]),
    new DayResult("5/17 (日)", [
      new Result("金子 侑起", 206),
      new Result("稲田 翼", -28.5),
      new Result("島田 昴祐", -147.5)
    ]),
    new DayResult("5/16 (土)", [
      new Result("稲田 翼", 135),
      new Result("北口 善紀", 103),
      new Result("清水 明彦", 87.5),
      new Result("竹澤 亮", 25),
      new Result("祖父江 尚也", 23.5),
      new Result("金子 侑起", 19),
      new Result("足立 真陽", -2.5),
      new Result("網 亮太朗", -95),
      new Result("清水 貴大", -205.5)
    ]),
    new DayResult("5/15 (金)", [
      new Result("竹澤 亮", 152.5),
      new Result("北口 善紀", 122),
      new Result("金子 侑起", 36),
      new Result("祖父江 尚也", 9),
      new Result("清水 貴大", -22.5),
      new Result("石橋 享典", -102.5),
      new Result("網 亮太朗", -124.5)
    ]),
    new DayResult("5/14 (木)", [
      new Result("竹澤 亮", 74),
      new Result("島田 昴祐", -12),
      new Result("網 亮太朗", -32)
    ]),
    new DayResult("5/9 (土)", [
      new Result("竹澤 亮", 246),
      new Result("清水 貴大", 62.5),
      new Result("北口 善紀", 61),
      new Result("足立 真陽", -21.5),
      new Result("稲田 翼", -45.5),
      new Result("金子 侑起", -103),
      new Result("清水 明彦", -129.5)
    ]),
    new DayResult("5/5 (火)", [
      new Result("清水 貴大", 162),
      new Result("足立 真陽", 50),
      new Result("網 亮太朗", -21),
      new Result("石橋 享典", -151)
    ]),
    new DayResult("5/4 (月)", [
      new Result("竹澤 亮", 101),
      new Result("祖父江 尚也", 52),
      new Result("網 亮太朗", -26),
      new Result("石橋 享典", -87)
    ]),
    new DayResult("5/3 (日)", [
      new Result("北口 善紀", 249),
      new Result("足立 真陽", 132.5),
      new Result("網 亮太朗", 118.5),
      new Result("竹澤 亮", 29),
      new Result("祖父江 尚也", -115.5),
      new Result("清水 貴大", -117.5),
      new Result("金子 侑起", -226)
    ]),
    new DayResult("4/29 (水)", [
      new Result("北口 善紀", 206.5),
      new Result("祖父江 尚也", 146),
      new Result("竹澤 亮", 102),
      new Result("稲田 翼", 65),
      new Result("石橋 享典", 47.5),
      new Result("清水 明彦", 23),
      new Result("足立 真陽", 16),
      new Result("網 亮太朗", -21),
      new Result("清水 貴大", -124),
      new Result("金子 侑起", -361)
    ]),
    new DayResult("4/28 (火)", [
      new Result("足立 真陽", 42.5),
      new Result("島田 昴祐", 5.5),
      new Result("金子 侑起", -18)
    ]),
    new DayResult("4/26 (日)", [
      new Result("稲田 翼", 211.5),
      new Result("金子 侑起", 44.5),
      new Result("清水 明彦", 34.5),
      new Result("竹澤 亮", 21.5),
      new Result("祖父江 尚也", 19.5),
      new Result("北口 善紀", 19),
      new Result("網 亮太朗", -108),
      new Result("島田 昴祐", -162.5)
    ]),
    new DayResult("4/25 (土)", [
      new Result("石橋 享典", 222.5),
      new Result("清水 明彦", 90.5),
      new Result("稲田 翼", 84),
      new Result("金子 侑起", -58.5),
      new Result("足立 真陽", -133.5),
      new Result("清水 貴大", -145)
    ]),
    new DayResult("4/19 (日)", [
      new Result("金子 侑起", 177),
      new Result("清水 明彦", 158.5),
      new Result("網 亮太朗", 114),
      new Result("足立 真陽", 61.5),
      new Result("北口 善紀", 27.5),
      new Result("稲田 翼", -72),
      new Result("竹澤 亮", -162.5),
      new Result("祖父江 尚也", -224)
    ]),
    new DayResult("4/18 (土)", [
      new Result("稲田 翼", 247.5),
      new Result("清水 貴大", 95.5),
      new Result("北口 善紀", 50),
      new Result("石橋 享典", 36),
      new Result("足立 真陽", 2.5),
      new Result("網 亮太朗", -7.5),
      new Result("清水 明彦", -15.5),
      new Result("竹澤 亮", -26.5),
      new Result("金子 侑起", -105),
      new Result("祖父江 尚也", -177)
    ]),
    new DayResult("4/17 (金)", [
      new Result("竹澤 亮", 107.5),
      new Result("祖父江 尚也", 73.5),
      new Result("石橋 享典", 35),
      new Result("稲田 翼", 17.5),
      new Result("足立 真陽", 13),
      new Result("北口 善紀", -24.5),
      new Result("網 亮太朗", -45),
      new Result("清水 明彦", -97)
    ]),
    new DayResult("4/12 (日)", [
      new Result("稲田 翼", 128),
      new Result("石橋 享典", 123),
      new Result("網 亮太朗", 71.5),
      new Result("北口 善紀", 67),
      new Result("祖父江 尚也", 14.5),
      new Result("清水 貴大", -21),
      new Result("足立 真陽", -24.5),
      new Result("竹澤 亮", -28.5),
      new Result("清水 明彦", -85),
      new Result("島田 昴祐", -145)
    ]),
    new DayResult("4/11 (土)", [
      new Result("石橋 享典", 89),
      new Result("清水 明彦", 86),
      new Result("北口 善紀", 10),
      new Result("清水 貴大", -145)
    ]),
    new DayResult("4/5 (日)", [
      new Result("竹澤 亮", 147.5),
      new Result("網 亮太朗", 125),
      new Result("清水 明彦", 35.5),
      new Result("石橋 享典", -34),
      new Result("足立 真陽", -56),
      new Result("北口 善紀", -158)
    ]),
    new DayResult("4/4 (土)", [
      new Result("網 亮太朗", 168),
      new Result("足立 真陽", 75),
      new Result("清水 貴大", 61),
      new Result("石橋 享典", -50.5),
      new Result("清水 明彦", -203.5)
    ]),
    new DayResult("4/3 (金)", [
      new Result("竹澤 亮", 187),
      new Result("足立 真陽", 6),
      new Result("北口 善紀", -33),
      new Result("清水 明彦", -120)
    ]),
    new DayResult("4/2 (木)", [
      new Result("清水 明彦", 103),
      new Result("北口 善紀", 32),
      new Result("竹澤 亮", 28),
      new Result("清水 貴大", -123)
    ])
  ],
  "2020q1": [
    new DayResult("3/31 (火)", [
      new Result("石橋 享典", 132),
      new Result("竹澤 亮", 115),
      new Result("網 亮太朗", -48),
      new Result("北口 善紀", -159)
    ]),
    new DayResult("3/29 (日)", [
      new Result("清水 明彦", 137),
      new Result("石橋 享典", 67.5),
      new Result("足立 真陽", -45),
      new Result("網 亮太朗", -53),
      new Result("竹澤 亮", -56.5)
    ]),
    new DayResult("3/28 (土)", [
      new Result("竹澤 亮", 317.5),
      new Result("足立 真陽", 182.5),
      new Result("石橋 享典", 48),
      new Result("清水 貴大", -201.5),
      new Result("清水 明彦", -296.5)
    ]),
    new DayResult("3/27 (金)", [
      new Result("竹澤 亮", 122),
      new Result("足立 真陽", 100.5),
      new Result("石橋 享典", -41),
      new Result("金子 侑起", -141.5)
    ]),
    new DayResult("3/26 (木)", [
      new Result("足立 真陽", 211),
      new Result("金子 侑起", 6.5),
      new Result("石橋 享典", -7),
      new Result("竹澤 亮", -170.5)
    ]),
    new DayResult("3/25 (水)", [
      new Result("石橋 享典", 97.5),
      new Result("竹澤 亮", 54.5),
      new Result("金子 侑起", -122)
    ]),
    new DayResult("3/23 (月)", [
      new Result("網 亮太朗", 81.5),
      new Result("竹澤 亮", -13),
      new Result("石橋 享典", -38.5)
    ]),
    new DayResult("3/21 (土)", [
      new Result("足立 真陽", 171),
      new Result("北口 善紀", 136),
      new Result("金子 侑起", 89),
      new Result("竹澤 亮", -157),
      new Result("清水 貴大", -189)
    ]),
    new DayResult("3/20 (金)", [
      new Result("北口 善紀", 233.5),
      new Result("金子 侑起", 30.5),
      new Result("足立 真陽", 2.5),
      new Result("清水 明彦", -47),
      new Result("網 亮太朗", -55.5),
      new Result("石橋 享典", -104)
    ]),
    new DayResult("3/19 (木)", [
      new Result("足立 真陽", 90.5),
      new Result("清水 明彦", 57.5),
      new Result("北口 善紀", 38),
      new Result("網 亮太朗", -146)
    ]),
    new DayResult("3/17 (火)", [
      new Result("金子 侑起", 33.5),
      new Result("清水 明彦", 22.5),
      new Result("網 亮太朗", -26)
    ]),
    new DayResult("3/14 (土)", [
      new Result("北口 善紀", 294),
      new Result("竹澤 亮", 129.5),
      new Result("足立 真陽", 19),
      new Result("金子 侑起", -102),
      new Result("清水 明彦", -106),
      new Result("網 亮太朗", -174.5)
    ]),
    new DayResult("3/13 (金)", [
      new Result("北口 善紀", 105.5),
      new Result("竹澤 亮", 76),
      new Result("金子 侑起", -36.5),
      new Result("足立 真陽", -105)
    ]),
    new DayResult("3/11 (水)", [
      new Result("金子 侑起", 99),
      new Result("網 亮太朗", 0.5),
      new Result("石橋 享典", 21),
      new Result("北口 善紀", -80.5)
    ]),
    new DayResult("3/10 (火)", [
      new Result("金子 侑起", 91.5),
      new Result("竹澤 亮", 87),
      new Result("網 亮太朗", 60),
      new Result("清水 明彦", 12.5),
      new Result("北口 善紀", -7),
      new Result("石橋 享典", -48.5),
      new Result("清水 貴大", -125.5)
    ]),
    new DayResult("3/8 (日)", [
      new Result("足立 真陽", 258),
      new Result("網 亮太朗", 53),
      new Result("清水 明彦", -160),
      new Result("石橋 享典", -111)
    ]),
    new DayResult("2/22 (土)", [
      new Result("竹澤 亮", 403),
      new Result("足立 真陽", -22),
      new Result("清水 明彦", -147),
      new Result("清水 貴大", -194)
    ]),
    new DayResult("2/11 (火)", [
      new Result("北口 善紀", 219.5),
      new Result("網 亮太朗", 94),
      new Result("清水 貴大", -114),
      new Result("石橋 享典", -159.5)
    ]),
    new DayResult("2/1 (土)", [
      new Result("竹澤 亮", 200),
      new Result("清水 明彦", 115.5),
      new Result("金子 侑起", 38),
      new Result("足立 真陽", 0),
      new Result("網 亮太朗", -63.5),
      new Result("石橋 享典", -103),
      new Result("北口 善紀", -117)
    ]),
    new DayResult("1/26 (日)", [
      new Result("竹澤 亮", 265),
      new Result("北口 善紀", 204),
      new Result("清水 明彦", -206.5),
      new Result("足立 真陽", -222.5)
    ]),
    new DayResult("1/13 (月)", [
      new Result("北口 善紀", 73),
      new Result("網 亮太朗", 33),
      new Result("竹澤 亮", -20),
      new Result("足立 真陽", -46)
    ]),
    new DayResult("1/12 (日)", [
      new Result("足立 真陽", 292.5),
      new Result("北口 善紀", 212),
      new Result("清水 明彦", -47.5),
      new Result("石橋 享典", -54),
      new Result("網 亮太朗", -72.5),
      new Result("金子 侑起", -270.5)
    ])
  ]
}

interface WithRoute{
    $route: Route
}

@Component
export default class RankingComponent extends Vue implements WithRoute {
  @Provide() menuActive: boolean = false

  menuToggle(): void {
    this.menuActive = !this.menuActive
  }

  get quarter(): string {
    const quarter = this.$route.params.quarter
    if (!quarter) {
      return "TOTAL"
    }
    if (!(quarter in quarterResults)) {
      return Object.keys(quarterResults)[0]
    }
    return quarter
  }

  get results(): DayResult[] {
    if (this.quarter === "TOTAL") {
      return ([] as DayResult[]).concat(...Object.values(quarterResults))
    }
    return quarterResults[this.quarter]
  }

  get ranking(): Result[] {
    let playerPoints: { [key: string]: number } = {};
    for (const dayResult of this.results) {
      if (!dayResult.isValid()) {
        throw new Error("invalid score in DayResult: " + dayResult.day);
      }
      for (const result of dayResult.results) {
        if (result.player in playerPoints) {
          playerPoints[result.player] += result.point;
        } else {
          playerPoints[result.player] = result.point;
        }
      }
    }
    let ranking: Result[] = [];
    for (const player in playerPoints) {
      ranking.push(new Result(player, playerPoints[player]));
    }
    ranking.sort(function(a, b) { return b.point - a.point });
    return ranking;
  }

  getBadgeClass(rank: number): string {
    if (rank == 0) {
      return "result-rank-badge is-top";
    } else if (rank == 1 || rank == 2) {
      return "result-rank-badge is-top-three";
    }
    return "result-rank-badge";
  }
}
</script>

<style>
/* リセットCSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* body */
body {
  background: #118745;
  border: 10px solid #118745;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
}

.body {
  color: #363636;
  background: white;
  border-radius: 5px;
  text-align: center;
}

.header {
  display: block;
  padding: 5px;
  border-bottom: solid thin #118745;
}

.clcontent {
  display: block;
  padding-top: 20px;
  padding-bottom: 10px;
}

.title span:lang(en) {
  display: block;
  font-size: 1rem;
}

.title span:lang(ja) {
  display: block;
  font-size: 0.7rem;
  margin-top: 3px;
}

.result-rank-item {
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.result-rank-badge {
  border-radius: 3px;
  margin-right: 10px;
  width: 25px;
  color: #fff;
  background-color: #999;
}

.result-rank-badge.is-top {
  background-color: #cd0000;
}

.result-rank-badge.is-top-three {
  background-color: #116423;
}

.result-rank-name {
  width: 100px;
  text-align: left;
}

.result-rank-score {
  width: 100px;
  text-align: right;
}

.day-result {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #007f31;
  display: inline-block;
}

.day {
  font-size: 1rem;
  font-weight: bold;
}

.navbar-end {
  margin: auto;
}

</style>