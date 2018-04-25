export default class WhereQueryBuilder {
    _conditions: Array<WhereCondition>;

    constructor() {
        this._conditions = [];
    }

    toString() {
        if (this._conditions.length === 0) {
            return '';
        }

        let result = '(';
        let firstCond = true;

        this._conditions.forEach(function (value) {
            if (!firstCond) {
                result += (value.combineWithAnd) ? ' AND ' : ' OR ';
            }

            result += value.condition.toString();

            firstCond = false;
        });

        result += ')';

        return result;
    }

    where(cond: string|WhereQueryBuilder) {
        this._conditions = [];
        this.andWhere(cond);
    }

    andWhere(cond: string|WhereQueryBuilder) {
        this._conditions.push({
            condition: cond,
            combineWithAnd: true
        });
    }

    orWhere(cond: string|WhereQueryBuilder) {
        this._conditions.push({
            condition: cond,
            combineWithAnd: false
        });
    }
}

interface WhereCondition {
    condition: string|WhereQueryBuilder;
    combineWithAnd: boolean;
}
