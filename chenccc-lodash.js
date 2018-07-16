var chenccc = {
    /**
     * Creates an array of elements split into groups the length of size.
     *  If array can't be split evenly, the final chunk will be the remaining elements.
     * 
     * @param {any} array The array to process.
     * @param {any} size The length of each chunk
     * @returns Returns the new array of chunks.
     */
    chunk: function (array, size) {
        var result = []
        for (var i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size))
        }
        return result
    },
    /**
     * Creates an array with all falsey values removed. 
     * The values false, null, 0, "", undefined, and NaN are falsey.
     * 
     * @param {any} array The array to compact.
     * @returns Returns the new array of filtered values.
     */
    compact: function compact(array) {
        var result = []
        var n = array.length
        for (var i = 0; i < n; i++) {
            if (array[i]) {
                result.push(array[i])
            }
        }
        return result
    },
    /**
     * Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons. 
     * The order and references of result values are determined by the first array.
    
     * 
     * @param {any} array The array to inspect.
     * @param {any} value The values to exclude.
     * @returns Returns the new array of filtered values.
     */
    difference: function difference(array, ...value) {
        var result = []
        var val = []
        for (var i = 0; i < value.length; i++) {
            val = val.concat(value[i])
        }
        var n = array.length
        for (var i = 0; i < n; i++) {
            if (val.indexOf(array[i]) < 0) {
                result.push(array[i])
            }
        }
        return result
    },
    differenceBy: function differenceBy(array, value, iteratee) {
        var predicate = _.iteratee(iteratee)
        return array.filter(it => !value.some(val => predicate(val) === predicate(it)))
    },
    differenceWith: function differenceWith(array, values, comparator) {
        return array.filter(it => !values.some(val => comparator(val,it)))
    },
    /**
     * Creates a slice of array with n elements dropped from the beginning.
     * 
     * @param {any} array The array to query.
     * @param {any} n The number of elements to drop.
     * @returns Returns the slice of array.
     */
    drop: function drop(array, n) {
        var result = []
        if (n == undefined) {
            n = 1
        }
        var m = array.length
        if (n > m) {
            return []
        }
        for (var i = n; i < m; i++) {
            result.push(array[i])
        }
        return result
    },
    /**
     * Creates a slice of array with n elements dropped from the end.
     * 
     * @param {any} array The array to query.
     * @param {any} n The number of elements to drop.
     * @returns Returns the slice of array.
     */
    dropRight: function dropRight(array, n) {
        var result = []
        if (n == undefined) {
            n = 1
        }
        var m = array.length
        if (n > m) {
            return []
        }
        for (var i = 0; i < m - n; i++) {
            result.push(array[i])
        }
        return result
    },
    dropRightWhile: function dropRightWhile(array, predicate) {
        var predicate = _.iteratee(predicate)
        for(var i = array.length - 1; i >= 0; i--) {
            if(!predicate(array[i])) {
                var index = i
                break
            }
        }
        return array.slice(0, index+1)
    },
    dropWhile: function dropWhile(array, predicate) {
        var predicate = _.iteratee(predicate)
        for(var i = 0; i < array.length; i++) {
            if(!predicate(array[i])) {
                return array.slice(i)
            }
        }
    },
    /**
     * Fills elements of array with value from start up to, but not including, end.
     * 
     * @param {any} array The array to fill.
     * @param {any} value The value to fill array with.
     * @param {number} [start=0] The start position.
     * @param {any} [end=array.length] The end position.
     * @returns Returns array.
     */
    fill: function fill(array, value, start = 0, end = array.length) {
        for (var i = start; i < end; i++) {
            array[i] = value
        }
        return array
    },
    findIndex: function findIndex(array, predicate) {
        var predicate = _.iteratee(predicate)
        for (var i = 0; i < array.length; i++) {
            if(predicate(array[i])) {
                return i
            }
        }
        return -1
    },
    findLastIndex: function findLastIndex(array, predicate) {
        var predicate = _.iteratee(predicate)
        for (var i = array.length - 1; i >= 0; i--) {
            if(predicate(array[i])) {
                return i
            }
        }
        return -1
    },
    /**
     * Flattens array a single level deep.
     * 
     * @param {any} ary The array to flatten.
     */
    flatten: function flatten(ary) {
        var res = []
        for (var i = 0; i < ary.length; i++) {
            if (Array.isArray(ary[i])) {
                for (var val of ary[i]) {
                    res.push(val)
                }
            } else {
                res.push(ary[i])
            }
        }
        return res
    },
    /**
     * Recursively flattens array.
     * 
     * @param {any} ary The array to flatten.
     * @returns Returns the new flattened array.
     */
    flattenDeep: function flattenDeep(ary) {
        return ary.reduce((result, val) => {
            if (Array.isArray(val)) {
                flattenDeep(val).forEach(item => {
                    result.push(item)
                })
            } else {
                result.push(val)
            }
            return result
        }, [])
    },
    /**
     * Recursively flatten array up to depth times.
     * 
     * @param {any} ary The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns  Returns the new flattened array.
     */
    flattenDepth: function flattenDepth(ary, depth = 1) {
        for (var i = 0; i < depth; i++) {
            ary = chenccc.flatten(ary)
        }
        return ary
    },
    /**
     * The inverse of _.toPairs; this method returns an object composed from key-value pairs.
     * 
     * @param {any} array The key-value pairs.
     * @returns Returns the new object.
     */
    fromPairs: function fromPairs(array) {
        var map = {}
        var n = array.length
        for (var i = 0; i < n; i++) {
            map[array[i][0]] = array[i][1]
        }
        return map
    },
    /**
     * Gets the first element of array.
     * 
     * @param {any} array The array to query.
     * @returns Returns the first element of array.
     */
    head: function head(array) {
        return array[0]
    },
    /**
     * Gets the index at which the first occurrence of value is found in array using SameValueZero for equality comparisons.
     * If fromIndex is negative, it's used as the offset from the end of array
     * 
     * @param {any} array The array to inspect.
     * @param {any} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns Returns the index of the matched value, else -1.
     */
    indexOf: function indexOf(array, value, fromIndex = 0) {
        var n = array.length
        for (var i = fromIndex; i < n; i++) {
            if (array[i] === value) {
                return i
            }
        }
        return -1
    },
    /**
     * Gets all but the last element of array.
     * 
     * @param {any} array The array to query.
     * @returns Returns the slice of array.
     */
    initial: function initial(array) {
        var result = []
        var n = array.length
        for (var i = 0; i < n - 1; i++) {
            result.push(array[i])
        }
        return result
    },
    /**
     * Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons. 
     * The order and references of result values are determined by the first array.
     * 
     * @param {any} array1 The arrays to inspect.
     * @param {any} array2 The arrays to inspect.
     * @returns Returns the new array of intersecting values.
     */
    intersection: function intersection(...arys) {
        var text = arys.shift()
        var res = []
        text.forEach(val => {
            if(arys.every(ary => ary.includes(val))) {
                res.push(val)
            }
        })
        return res
    },
    intersectionBy: function intersectionBy(...arys) {
        var predicate = _.iteratee(arys.pop())
        var text = arys.shift()
        return arys.reduce((res, val) => {
            var val = val.map(it => predicate(it))
            text.forEach(it => {
                if(val.includes(predicate(it))) {
                    res.push(it)
                }
            })
            return res
        },[])
    },
    intersectionWith: function intersectionWith(...arys) {
        var comparator = _.iteratee(arys.pop())
        var text = arys.shift()
        return arys.reduce((res,values) => {
            text.forEach(it => {
                values.forEach(val => {
                    if(comparator(it, val)) {
                        res.push(it)
                    }
                })
            })
            return res
        },[])
    },
    /**
     * Converts all elements in array into a string separated by separator.
     * 
     * @param {any} array The array to convert.
     * @param {string} [sep=","] The element separator.
     * @returns Returns the joined string.
     */
    join: function join(array, sep = ",") {
        var n = array.length
        var sum = ""
        for (var i = 0; i < n; i++) {
            if (i == n - 1) {
                sum = sum + array[i]
                break
            }
            sum = sum + array[i] + sep
        }
        return sum
    },
    /**
     * Gets the last element of array.
     * 
     * @param {any} array The array to query
     * @returns Returns the last element of array.
     */
    last: function last(array) {
        return array[array.length - 1]
    },
    /**
     * This method is like _.indexOf except that it iterates over elements of array from right to left.
     * 
     * @param {any} array The array to inspect.
     * @param {any} value The value to search for.
     * @param {any} [fromIndex=array.length - 1] The index to search from.
     * @returns Returns the index of the matched value, else -1.
     */
    lastIndexOf: function lastIndexOf(array, value, fromIndex = array.length - 1) {
        var n = array.length
        for (var i = fromIndex; i >= 0; i--) {
            if (array[i] == value) {
                return i
            }
        }
        return -1
    },
    /**
     * Gets the element at index n of array. If n is negative, the nth element from the end is returned.
     * 
     * @param {any} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns Returns the nth element of array
     */
    nth: function nth(array, n = 0) {
        return n >= 0 ? array[n] : array[array.length + n]
    },
    /**
     * Removes all given values from array using SameValueZero for equality comparisons.
     * 
     * @param {any} array The array to modify.
     * @param {any} values The values to remove.
     * @returns Returns array.
     */
    pull: function pull(array, ...values) {
        var n = array.length
        var m = values.length
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n; j++) {
                if (values[i] == array[j]) {
                    array.splice(j, 1)
                }
            }
        }
        return array
    },
    /**
     * This method is like _.pull except that it accepts an array of values to remove.
     * 
     * @param {any} array The array to modify.
     * @param {any} values The values to remove.
     * @returns Returns array.
     */
    pullAll: function pullAll(array, values) {
        var n = array.length
        var m = values.length
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n; j++) {
                if (values[i] == array[j]) {
                    array.splice(j, 1)
                }
            }
        }
        return array
    },
    pullAllBy: function pullAllBy(array, values, iteratee) {
        var predicate = _.iteratee(iteratee)
        var values = values.map(it => predicate(it))
        return array.filter(it => !values.includes(predicate(it)))
    },
    pullAllWith: function pullAllWith(array, values, comparator) {
        var comparator = _.iteratee(comparator)
        return array.filter(it => !values.some(val => comparator(it, val)))
    },
    /**
     * Reverses array so that the first element becomes the last, 
     * the second element becomes the second to last, and so on.
     * 
     * @param {any} ary The array to modify.
     * @returns Returns array.
     */
    reverse: function reverse(ary) {
        var n = ary.length
        var result = []
        for (var i = n - 1; i >= 0; i--) {
            result.push(ary[i])
        }
        return result
    },
    /**
     * Uses a binary search to determine the lowest index at which value should be inserted into array in order to maintain its sort order.
    
    
     * 
     * @param {any} array The sorted array to inspect.
     * @param {any} value The value to evaluate.
     * @returns Returns the index at which value should be inserted into array.
     */
    sortedIndex: function sortedIndex(array, value) {
        let left = 0
        let right = array.length - 1
        while (left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (value <= array[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        }
        return left
    },
    sortedIndexBy: function sortedIndexBy(array, value, iteratee) {
        var predicate = _.iteratee(iteratee)
        var array = array.map(it => predicate(it))
        return this.sortedIndex(array, predicate(value))
    },
    sortedIndexOf: function sortedIndexOf(array, value) {
        var result = this.sortedIndex(array, value)
        return result ? result : -1 
    },
    sortedLastIndex: function sortedLastIndex(array, value) {
        let left = 0
        let right = array.length - 1
        while (left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (value < array[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        }
        return left
    },
    sortedLastIndexBy: function sortedLastIndexBy(array, value, iteratee) {
        var predicate = _.iteratee(iteratee)
        var array = array.map(it => predicate(it))
        return this.sortedLastIndex(array, predicate(value))
    },
    sortedLastIndexOf: function sortedLastIndexOf(array, value) {
        var res = this.sortedLastIndex(array, value)
        return res ? res - 1 : -1
    },
    sortedUniq: function sortedUniq(array) {
        return [...new Set(array)]
    },
    sortedUniqBy: function sortedUniqBy(array, iteratee) {
        var array = array.sort((a,b) => a-b)
        var predicate = _.iteratee(iteratee)
        var res = []
        for(var i = 0; i < array.length; i++) {
            if(predicate(array[i]) !== predicate(array[i-1])) {
                res.push(array[i])
            }
        }
        return res
    },
    /**
     * Gets all but the first element of array.
     * 
     * @param {any} array The array to query.
     * @returns Returns the slice of array.
     */
    tail: function tail(array) {
        return array.slice(1)
    },
    /**
     * Creates a slice of array with n elements taken from the beginning.
     * 
     * @param {any} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @returns Returns the slice of array.
     */
    take: function take(array, n = 1) {
        return array.splice(0, n)
    },
    /**
     * Creates a slice of array with n elements taken from the end.
     * 
     * @param {any} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @returns Returns the slice of array.
     */
    takeRight: function takeRight(array, n = 1) {
        if (n === 0) {
            return []
        } else {
            return array.slice(-n)
        }
    },
    takeRightWhile: function takeRightWhile(array, predicate) {
        var predicate = _.iteratee(predicate)
        for(var i = array.length - 1; i >= 0; i--) {
            if(!predicate(array[i])) {
                break
            }
        }
        return array.slice(i + 1)
    },
    takeWhile: function takeWhile(array, predicate) {
        var predicate = _.iteratee(predicate)
        for(var i = 0; i < array.length; i++) {
            if(!predicate(array[i])) {
                break
            }
        }
        return array.slice(0, i)
    },
    union: function union(...arrays) {
        var res = []
        arrays.forEach(it => {
            if(Array.isArray(it)) {
                res.push(...it)
            }
        })
        return Array.from(new Set(res))
    },
    unionBy: function unionBy(...arrays) {
        var predicate = _.iteratee(arrays.pop())
        return arrays.reduce((array, values) => {
            values.forEach(val => {
                if(!array.map(it => predicate(it)).includes(predicate(val))) {
                    array.push(val)
                }
            })
            return array
        }, [])
    },
    unionWith: function unionWith(...arrays) {
        var comparator = _.iteratee(arrays.pop())
        var array = arrays.reduce((res, val) => res.concat(val), [])
        var result = []
        for (var i = 0; i < array.length; i++) {
            for (var j = i+1; j < array.length; j++) {
                if(comparator(array[i], array[j])) {
                    array.splice(j, 1)
                    j -= 1
                }
            }
        }
        return array
    },
    uniq: function uniq(array) {
        return [...new Set(array)]
    },
    uniqBy: function uniqBy(array, iteratee) {
        var predicate = _.iteratee(iteratee)
        var result = []
        var set = new Set()
        array.forEach(val => {
            if(!set.has(predicate(val))) {
                set.add(predicate(val))
                result.push(val)
            }
        })
        return result
    },
    uniqWith: function uniqWith(...arrays) {
        return this.unionWith(...arrays)
    },
    unzip: function unzip(arrays) {
        return arrays.shift().reduce((res, val) => {
            var val = [val]
            arrays.forEach(it => {
                val.push(it.shift())
            })
            res.push(val)
            return res
        }, [])
    },
    unzipWith: function unzipWith(array, iteratee) {
        var predicate = _.iteratee(iteratee)
        return this.unzip(array).map(it => predicate(...it))
    },
    without: function without(array, ...values) {
        var result = []
        array.forEach(it => {
            if(!values.includes(it)) {
                result.push(it)
            }
        })
        return result
    },
    xor: function xor(...arrays) {
        var ary = new Set(arrays.shift())
        arrays.forEach(it => {
            it.forEach(val => {
                ary.has(val) ? ary.delete(val) : ary.add(val)
            })
        })
        return [...ary]
    },
    xorBy: function xorBy(...arrays) {
        var predicate = _.iteratee(arrays.pop())
        var result = []
        var arrays = _.flattenDeep(arrays)
        var ary = arrays.map(it => predicate(it))
        var rep = ary.filter((item, index, collection) => collection.indexOf(item) !== index)
        return arrays.filter(it => !rep.includes(predicate(it)))
    },
    xorWith: function xorWith(...arrays) {
        var predicate = _.iteratee(arrays.pop())
        var arrays = _.flattenDeep(arrays)
         return arrays.reduce((res, val, index) => {
            var arrs = arrays.slice()
            arrs.splice(index, 1)
            if(!arrs.some(it => predicate(it, val))) {
                res.push(val)
            }
            return res
        }, [])
    },
    zip: function zip(...array) {
        return this.unzip(array)
    },
    zipObject: function zipObject(props, values) {
        return props.reduce((res, val, index) => {
            res[val] = values[index]
            return res
        }, {})
    },
    zipWith: function zipWith(...arrays) {
        var predicate = _.iteratee(arrays.pop())
        return this.unzipWith(arrays, predicate)
    },
    countBy: function countBy(collection, iteratee) {
        var predicate = _.iteratee(iteratee)
        return collection.reduce((res, val) => {
            !res[predicate(val)] ? res[predicate(val)] = 1 : res[predicate(val)]++
            return res
        }, {})
    },
    every: function every(collection, predicate) {
        var predicate = _.iteratee(predicate) 
        for(var i = 0; i < collection.length; i++) {
            if(!predicate(collection[i])) {
                return false
            }
        }
        return true
    },
    /**
     * Iterates over elements of collection, returning an array of all elements predicate returns truthy for. 
     * The predicate is invoked with three arguments: (value, index|key, collection).
     * 
     * @param {any} collection The collection to iterate over.
     * @param {any} test The function invoked per iteration.
     * @returns Returns the new filtered array.
     */
    filter: function filter(collection, predicate) {
        var predicate = _.iteratee(predicate)
        return collection.reduce((res, val) => {
            if(predicate(val)) {
                res.push(val)
            }
            return res
        }, [])
    },
    find: function find(collection, predicate) {
        var predicate = _.iteratee(predicate)  
        for(var i = 0; i < collection.length; i++) {
            if(predicate(collection[i])) {
                return collection[i]
            }
        }
    },
    findLast: function findLast(collection, predicate) {
        var predicate = _.iteratee(predicate)
        for(var i = collection.length; i >= 0; i--) {
            if(predicate(collection[i])) {
                return collection[i]
            }
        }
    },
    flatMap: function flatMap(collection, iteratee) {
        var predicate = _.iteratee(iteratee)
        return collection.reduce((res, val) => {
            res.push(...predicate(val))
            return res
        }, [])
    },
    flatMapDeep: function flatMapDeep(collection, iteratee) {
        var predicate = _.iteratee(iteratee)
        return collection.reduce((res, val) => {
            res.push(..._.flattenDeep(predicate(val)))
            return res
        }, [])
    },
    flatMapDepth: function flatMapDepth(collection, iteratee, depth=1) {
        var predicate = _.iteratee(iteratee)
        return collection.reduce((res, val) => {
            res.push(..._.flattenDepth(predicate(val), depth-1))
            return res
        }, [])
    },
    /**
     * Iterates over elements of collection and invokes iteratee for each element. 
     * The iteratee is invoked with three arguments: (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.
     * 
     * @param {any} array The collection to iterate over.
     * @param {any} action  The function invoked per iteration.
     * @returns Returns collection.
     */
    forEach: function forEach(array, action) {
        for (var key in array) {
            action(array[key], key, array)
        }
        return array
    },
    forEachRight: function forEachRight(array, iteratee) {
        var predicate = _.iteratee(iteratee)
        for(var i = array.length; i >= 0; i--) {
            predicate(array[i])
        }
        return array
    },
    groupBy: function groupBy(collection, iteratee) {
        var predicate = _.iteratee(iteratee)
        return collection.reduce((res,val) => {
            !res[predicate(val)] ? res[predicate(val)] = [val] : res[predicate(val)].push(val)
            return res
        }, {})
    },
    includes: function includes(collection, value, fromIndex=0) {
        if(typeof collection === 'string') {
            return collection.indexOf(value) > -1
        } else {
            collection = Object.values(collection)
            for (var i = fromIndex; i < collection.length; i++) {
                if(collection[i] === value) {
                    return true
                }
            }
            return false
        }
    },
    invokeMap: function invokeMap(collection, path, args) {
        if(typeof path === 'string') {
            predicate = Object.values(collection)[path]
        } else {
            predicate = path
        }
        return collection.reduce((res, val) => {
            res.push(predicate.call(val, args))
            return res
        }, [])
    },
    keyBy: function keyBy(collection, iteratee) {
        var predicate = _.iteratee(iteratee)
        return collection.reduce((res, val) => {
            res[predicate(val)] = val
            return res
        }, {})
    },
    /**
     * Creates an array of values by running each element in collection thru iteratee. 
     * The iteratee is invoked with three arguments:
     * 
     * @param {any} collection The collection to iterate over.
     * @param {any} transform The function invoked per iteration.
     * @returns Returns the new mapped array.
     */
    map: function map(collection, iteratee) {
        var predicate = _.iteratee(iteratee)
        return Object.values(collection).reduce((res, val) => {
            res.push(predicate(val))
            return res
        }, [])
    },
    orderBy: function orderBy(collection, iteratee, orders) {
        var iteratee = iteratee.map(it => _.iteratee(it))
        iteratee.forEach((val, index) => {
            if(orders[index] === 'asc') {
                collection.sort((a, b) => {
                    return val(a) > val(b)
                })
            } else {
                collection.sort((a, b) => {
                    return val(b) > val(a)
                })
            }
        })
        return collection
    },
    partition: function partition(collection, predicate) {
        var predicate = _.iteratee(predicate)
        return collection.reduce((res, val) => {
            if(predicate(val)) {
                res[0].push(val)
            } else {
                res[1].push(val)
            }
            return res
        }, [[],[]])
    },
    /**
     * Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee, 
     * where each successive invocation is supplied the return value of the previous. If accumulator is not given,
     *  the first element of collection is used as the initial value. The iteratee is invoked with four arguments:
     * 
     * @param {any} ary The collection to iterate over.
     * @param {any} combiner The function invoked per iteration.
     * @param {any} initval The initial value
     * @returns Returns the accumulated value.
     */
    reduce: function reduce(collection, iteratee, initval) {
        if (initval == undefined) {
            initval = collection[0]
            for (var i = 1; i < collection.length; i++) {
                initval = iteratee(initval, collection[i])
            }
            return initval
        } else {
            for (var index in collection) {
                initval = iteratee(initval, collection[index], index)
            }
            return initval
        }
    },
    reduceRight: function reduceRight(collection, iteratee, accumulator=0) {
        var collection = collection.reverse()
        var initval = accumulator
        for(var index in collection) {
            initval = iteratee(initval, collection[index], index)
        }
        return initval
    },
    reject: function reject(collection, predicate) {
        var predicate = _.iteratee(predicate)
        return collection.filter(it => !predicate(it))
    },
    size: function size(collection) {
        return Object.values(collection).length
    },
    some: function some(collection, predicate) {
        var predicate = _.iteratee(predicate)
        for (var i = 0; i < collection.length; i++) {
            if(predicate(collection[i])) {
                return true
            }
        }
        return false
    },
    sortBy: function sortBy(collection, iteratee) {
        var iteratee = iteratee.map(it => _.iteratee(iteratee)).reverse()
        iteratee.forEach(predicate => {
            collection.sort((a, b) => predicate(a) > predicate(b))
        })
        return collection
    },
    castArray: function castArray(...value) {
        return value
    },
    conformsTo: function conformsTo(object, source) {
        return Object.keys(source).every(it => source[it](object[it]))
    },
    eq: function eq(value, other) {
        if(Number.isNaN(value) && Number.isNaN(other)) {
            return true
        } else {
            return value === other
        }
    },
    gt: function gt(value, other) {
        return value > other
    },
    gte: function gte(value, other) {
        return value >= other
    },
    isArguments: function isArguments(value) {
        return Object.prototype.toString.call(value) === '[object Arguments]'
    },
    isArray: function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]'
    },
    isArrayBuffer: function isArrayBuffer(value) {
        return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
    },
    isArrayLike: function isArrayLike(value) {
        return Number.isInteger(value.length) && (value.length >= 0 || value.length <= Number.MAX_SAFE_INTEGER) && typeof value !== 'function'
    },
    isArrayLikeObject: function isArrayLikeObject(value) {
        if(typeof value === 'object') {
            return true
        } else {
            return this.isArrayLike(value)
        }
    },
    isBoolean: function isBoolean(value) {
        return Object.prototype.toString.call(value) === '[object Boolean]'
    },
    isDate: function isDate(value) {
        return Object.prototype.toString.call(value) === '[object Date]'
    },
    isElement: function isElement(value) {
        return value instanceof Element
    },
    isEmpty: function isEmpty(value) {
        if(value === null) {
            return true
        } else {
            return Object.keys(value).length === 0
        }
    },
    isEqual: function isEqual(value, other) {
        if(value === other) {
            return true
        }
        if(typeof value !== typeof other) {
            return false
        }
        if(Array.isArray(value) && Array.isArray(other)) {
            if(value.length !== other.length) {
                return false
            }
            for (var i = 0; i < value.length; i++) {
                if(value[i] !== other[i]) {
                    return false
                }
            }
            return true
        }
        if(typeof value === 'object' && typeof other === 'object') {
            for(var index in value) {
                if(value[index] !== other[index]) {
                    return false
                }
            }
            return true
        }
        return false
    },
    isError: function isError(value) {
        return value instanceof Error
    },
    isFinite: function isFinite(value) {
        return Number.isFinite(value)
    },
    isFunction: function isFunction(value) {
        return Object.prototype.toString.call(value) === '[object Function]'
    },
    isInteger: function isInteger(value) {
        return Number.isInteger(value)
    },
    isLength: function isLength(value) {
        return Number.isInteger(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER
    },
    isMap: function isMap(value) {
        return value instanceof Map
    },
    isMatch: function isMatch(obj, src) {
        for(var key in src) {
            if(src[key] !== obj[key]) {
                return false
            }
        }
        return true
    },
    isNaN: function isNaN(value) {
        if(typeof value === 'object') {
            return Number.isNaN(value.valueOf())
        }
        return Number.isNaN(value)
    },
    isNative: function isNative(value) {
        return typeof value === 'function' && (value + '').includes('native code')
    },
    isNil: function isNil(value) {
        return value === null || value === undefined
    },
    isNull: function isNull(value) {
        return value === null
    },
    isNumber: function isNumber(value) {
        return typeof value === 'number' || value instanceof Number 
    },
    isObject: function isObject(value) {
        return value !== null && (typeof value === 'object' || typeof value === 'function')
    },
    isObjectLike: function isObjectLike(value) {
        return value !== null && typeof value === 'object'
    },
    isPlainObject: function isPlainObject(value) {
        var proto = Object.getPrototypeOf(value)
        return proto === null || proto === Object.prototype
    },
    isRegExp: function isRegExp(value) {
        return value instanceof RegExp
    },
    isSafeInteger: function isSafeInteger(value) {
        return Number.isSafeInteger(value)
    },
    isSet: function isSet(value) {
        return value instanceof Set
    },
    isString: function isString(value) {
        return typeof value === 'string' || value instanceof String
    },
    isSymbol: function isSymbol(value) {
        return typeof value === 'symbol'
    },
    isUndefined: function isUndefined(value) {
        return value === undefined
    },
    isWeakMap: function isWeakMap(value) {
        return value instanceof WeakMap
    },
    isWeakSet: function isWeakSet(value) {
        return value instanceof WeakSet
    },
    it: function it(value, other) {
        return value < other
    },
    ite: function ite(value, other) {
        return value <= other
    },
    toArray: function toArray(value) {
        if(value === null || value === undefined) {
            return []
        } else {
            return Object.values(value)
        }
    },
    toFinite: function toFinite(value) {
        if(_.isFinite(Number(value))) {
            return Number(value)
        }
        if(value === Infinity) {
            return Number.MAX_VALUE
        }
        if(value === -Infinity) {
            return Number.MIN_VALUE
        }
    },
    toInteger: function toInteger(value) {
        if(Number.isInteger(Number(value))) {
            return value
        }
        if(value === Infinity || value === -Infinity) {
            return _.toFinite(value)
        }
        return Math.floor(Number(value))
    },
    toLength: function toLength(value) {
        var value = _.toInteger(value)
        if(value <= 0) {
            return 0
        }
        if(value > Number.MAX_VALUE) {
            return 2 ** 32 - 1
        }
        return value
    },
    toNumber: function toNumber(value) {
        return Number(value)
    },
    assign: function assign(...value) {
        var obj = value.shift()
        value.forEach(it => {
            Object.keys(it).forEach(key => {
                obj[key] = it[key]
            })
        })
        return obj
    },
    toSafeInteger: function toSafeInteger(value) {
        var value = _.toInteger(value)
        if(value > Number.MAX_SAFE_INTEGER) {
            return Number.MAX_SAFE_INTEGER
        }
        if(value < Number.MIN_SAFE_INTEGER) {
            return Number.MIN_SAFE_INTEGER
        }
        return value
    },
    add: function add(a, b) {
        return a + b
    },
    assignIn: function assignIn(...object) {
        var res = {}
        object.forEach(it => {
            for(var key in it) {
                res[key] = it[key]
            }
        })
        return res
    },
    at: function at(object, paths) {
        var result = []
        paths.forEach((str, index) => {
            var pathary = _.toPath(str)
            result[index] = pathary.reduce((a, b) => {
                return a[b]
            }, object)
        })
        return result
    },
    defaults: function defaults(object, ...sources) {
        sources.forEach(item => {
            for(var prop in item) {
                if(!object.hasOwnProperty(prop)) {
                    object[prop] = item[prop]
                } 
            }
        })
        return object
    },
    defaultsDeep: function defaultsDeep(object, source) {
        for(var key in source) {
            if(!object[key]) {
                object[key] = source[key]
            } else if(_.isObject(object[key]) && _.isObject(source[key])) {
                object[key] = Object.assign(source[key], object[key])
            }
        }
        return object
    },
    findKey: function findKey(object, predicate) {
        var predicate = _.iteratee(predicate)
        for(var key in object) {
            if(predicate(object[key])) {
                return key
            }
        }
    },
    findLastKey: function findLastKey(object, predicate) {
        var predicate = _.iteratee(predicate)
        return Object.keys(object).reverse().find(key => predicate(object[key]))
    },
    forIn: function forIn(object, iteratee) {
        for(var key in object) {
            iteratee(object[key], key, object)
        }
        return object
    },
    forInRight: function forInRight(object, iteratee) {
        var result = Object.keys(object).reverse()
        for(var key in result) {
            iteratee(result[key], key, object)
        }
        return object
    },
    forOwn: function forOwn(object, iteratee) {
        Object.keys(object).some(key => !iteratee(object[key]))
        return object
    },
    forOwnRight: function(object, iteratee) {
        Object.keys(object).reverse().some(key => !iteratee(object[key]))
        return object
    },
    functions: function functions(object) {
        return Object.keys(object)
    },
    functionsIn: function functionsIn(object) {
        var res = []
        for(var key in object) {
            res.push(key)
        }
        return res
    },
    get: function get(object, path, defaultValue) {
        var path = _.toPath(path)
        for(var key of path) {
            object = object[key]
            if(object === undefined) {
                return defaultValue
            }
        }
        return object
    },
    has: function had(object, path) {
        var path = _.toPath(path)
        for(var key of path) {
            if(object.hasOwnProperty(key)) {
                object = object[key]
            } else {
                return false
            }
        }
        return true
    },
    hasIn: function hasin(object, path) {
        var path = _.toPath(path)
        for(var key of path) {
            if(object[key]) {
                object = object[key]
            } else {
                return false
            }
        }
        return true
    },
    invert: function invert(object) {
        return Object.keys(object).reduce((res, key) => {
            res[object[key]] = key
            return res
        }, {})
    },
    invertBy: function invertBy(object, iteratee) {
        var predicate = _.iteratee(iteratee)
        return Object.keys(object).reduce((res, key) => {
            if(res[predicate(object[key])]) {
                res[predicate(object[key])].push(key)
            } else {
                res[predicate(object[key])] = [key]
            }
            return res
        }, {})
    },
    invoke: function invoke(object, path, ...args) {
        var path = _.toPath(path)
        var f = path.pop()
        path.forEach(key => {
            object = object[key]
        })
        return object[f](...args)
    },
    keys: function keys(object) {
        return Object.keys(object)
    },
    keysIn: function keysIn(object) {
        var result = []
        for(var key in object) {
            result.push(key)
        }
        return result
    },
    mapKeys: function mapKeys(object, iteratee) {
        var iteratee = _.iteratee(iteratee)
        var res = {}
        Object.keys(object).forEach(key => {
            res[iteratee(object[key], key)] = object[key]
        })
        return res
    },
    mapValues: function mapValues(object, iteratee) {
        var predicate = _.iteratee(iteratee)
        var res = {}
        Object.keys(object).forEach(key => {
            res[key] = predicate(object[key])
        })
        return res
    },
    merge: function merge(obj, srcs) {
        for(var key in obj) {
            obj[key].forEach((val,index) => {
                val[Object.keys(srcs[key][index])] = Number(Object.values(srcs[key][index]))
            })
        }
        return obj
    },
    omit: function omit(object, props) {
        return Object.keys(object).reduce((res, key) => {
            if(!props.includes(key)) {
                res[key] = object[key]
            }
            return res
        }, {})
    },
    omitBy: function omitBy(object, predicate) {
        return Object.keys(object).reduce((res, key) => {
            if(!predicate(object[key])) {
                res[key] = object[key]
            }
            return res
        }, {})
    },
    pick: function pick(object, props) {
        return Object.keys(object).reduce((res, key) => {
            if(props.includes(key)) {
                res[key] = object[key]
            }
            return res
        }, {})
    },
    pickBy: function pickBy(object, predicate) {
        return Object.keys(object).reduce((res, key) => {
            if(predicate(object[key])) {
                res[key] = object[key]
            }
            return res
        }, {})
    },
    result: function result(object, path, defaultValue) {
        var get = _.get(object, path, defaultValue)
        if(_.isFunction(get)) {
            return get.call(this)
        }
        return get
    },
    set: function set(obj, path, val) {
        var temp = obj
        var path = _.toPath(path)
        for (var i = 0; i < path.length; i++) {
            if(i === path.length - 1) {
                temp[path[i]] = val
            } else {
                if(!(path[i] in temp)) {
                    if(_.isNaN(Number(path[i+1]))) {
                        temp[path[i]] = {}
                    } else {
                        temp[path[i]] = []
                    }
                }
                temp = temp[path[i]]
            }
        }
        return obj
    },
    toPairs: function toPairs(object) {
        return Object.entries(object)
    },
    toPairsIn: function toPairsIn(object) {
        var res = []
        for(var key in object) {
            res.push([key, object[key]])
        }
        return res
    },
    transform: function transform(object, iteratee, accumulator) {
        var predicate = _.iteratee(iteratee)
        for(var [key, val] of Object.entries(object)) {
            if(predicate(accumulator, val, key) === false) {
                break
            }
        }
        return accumulator
    },
    unset: function unset(object, path) {
        var path = _.toPath(path)
        path.forEach(key => {
            if(!object[key]) {
                return false
            }
            object = object[key]
        })
        return true
    },
    update: function update(obj, path, updater) {
        var path = _.toPath(path)
        var temp = obj
        for (var i = 0; i < path.length; i++) {
            if(i === path.length - 1) {
                temp[path[i]] = updater(temp[path[i]])
            } else {
                if(!(path[i] in temp)) {
                    if(_.isNaN(Number(path[i+1]))) {
                        temp[path[i]] = {}
                    } else {
                        temp[path[i]] = []
                    }
                }
                temp = temp[path[i]]
            }
        }
        return obj
    },
    values: function values(object) {
        return Object.values(object)
    },
    valuesIn: function valuesIn(object) {
        var result = []
        for (var key in object) {
            result.push(object[key])
        }
        return result
    },
    endsWith: function endsWith(string, target, position=string.length) {
        return string[position-1] === target
    },
    pad: function pad(string="", length=0, chars=' ') {
        var padLength = length - string.length
        var padL = Math.floor(padLength / 2)
        var padR = Math.ceil(padLength / 2)
        var padLeft = chars.repeat(Math.ceil(padL / chars.length)).slice(0, padL)
        var padRight = chars.repeat(Math.ceil(padR / chars.length)).slice(0, padR)
        return padLeft + string + padRight
    },
    padEnd: function padEnd(string="", length=0, chars=' ') {
        var padLength = length - string.length
        var padRight = chars.repeat(Math.ceil(padLength / chars.length)).slice(0, padLength)
        return string + padRight
    },
    padStart: function padStart(string="", length=0, chars=' ') {
        var padLength = length - string.length
        var padLeft = chars.repeat(Math.ceil(padLength / chars.length)).slice(0, padLength)
        return padLeft + string
    },
    parseInt: function parseInt(string, radix=10) {
        return Number.parseInt(string, radix)
    },
    repeat: function repeat(string='', n=0) {
        var str = string
        if(n === 0) {
            return ''
        } else {
            while(n > 0) {
                string += str
                n--
            }
            return string
        }
    },
    replace: function replace(string='', pattern, replacement) {
        return string.replace(pattern, replacement)
    },
    split: function split(string='', separator, limit) {
        return string.split(separator, limit)
    },
    /**
     * Creates a function that invokes func with arguments reversed.
     * 
     * @param {function} f The function to flip arguments for.
     * @returns Returns the new flipped function.
     */
    flip: function flip(f) {
        return function (...args) {
            return f(...args.reverse())
        }
    },
    startsWith: function startsWith(string='', target, position=0) {
        return string[position] === target
    },
    toLower: function toLower(string='') {
        return string.toLowerCase()
    },
    toUpper: function toUpper(string='') {
        return string.toUpperCase()
    },
    defaultTo: function defaultTo(value, defaultValue) {
        return (_.isNaN(value) || _.isNil(value)) ? defaultValue : value
    },
    range: function range(start=0, end, step=1) {
        var res = []
        if(end === undefined) {
            if(!start) {
                return []
            }
            if(start > 0) {
                for(var i = 0; i < start; i++) {
                    res.push(i)
                }
                return res
            } else {
                for(var i = 0; i < -start; i++) {
                    res.push(-i)
                }
                return res
            }
        } else {
            if(end > 0) {
                for(var i = start; i < end; i+=step) {
                    res.push(i)
                    if(res.length === end - start) {
                        break
                    }
                }
                return res
            } else {
                for(var i = start; i > end; i+=step) {
                    res.push(i)
                }
                return res
            }
        }
    },
    rangeRight: function rangeRight(start=0, end, step=1) {
        return this.range(start, end, step).reverse()
    },
    times: function times(n, iteratee) {
        var result = []
        for(var i = 0; i < n; i++) {
            result.push(iteratee(i))
        }
        return result
    },
    identity: function identity(...value) {
        return value[0]
    },

    /**
     * Creates a function that invokes func with the this binding of 
     * the create function and an array of arguments much like Function#apply.
     * 
     * @param {any} func The function to spread arguments over.
     * @returns Returns the new function.
     */
    spread: function spread(func) {
        return function (ary) {
            return func(...ary)
        }
    },
    concat: function concat(array, ...values) {
        return values.reduce((res, val) => res.concat(val), array)
    },
    pullAt: function pullAt(array, ...indexes) {
        var indexes = _.flatten(indexes)
        var res = []
        indexes.forEach(it => {
            res.push(array[it])
            array[it] = _
        })
        for(var i = 0; i < array.length; i++) {
            if(array[i] === _) {
                array.splice(i, 1)
                i--
            }
        }
        return res
    },
    matches: function matches(source) {
        return function(obj) {
            for(var key in source) {
                if(source[key] !== obj[key]) {
                    return false
                }
            }
            return true
        }
    },
    property: function property(path) {
        return function(obj) {
            return _.get(obj, path)
        }
    },
    constant: function constant(value) {
        return function() {
            return value
        }
    },
    flow: function flow(...funcs) {
        var funcs = _.flattenDeep(funcs)
        return function(...args) {
            var value = funcs.shift()(...args)
            return funcs.reduce((value, func) => func.call(null, value), value)
        }
    },
    method: function method(path, ...args) {
        return function(obj) {
            return _.get(obj, path)(...args)
        }
    },
    methodOf: function methodOf(obj, ...args) {
        return function(path) {
            return _.get(obj, path)(...args)
        }
    },
    nthArg: function nthArg(n) {
        return function(...args) {
            return args[n]
        }
    },
    propertyOf: function propertyOf(obj) {
        return function(path) {
            return _.get(obj, path)
        }
    },
    /**
     * Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation. 
     * The func is invoked with the this binding and arguments of the created function.
     * 
     * @param {any} func The function to restrict.
     * @returns Returns the new restricted function.
     */
    once: function once(func) {
        var first = true
        var firstresult
        return function (...ary) {
            if (first) {
                first = false
                return firstresult = func(...ary)
            } else {
                return firstresult
            }
        }
    },
    /**
     * Creates a function that negates the result of the predicate func. 
     * The func predicate is invoked with the this binding and arguments of the created function.
     * 
     * @param {any} func The predicate to negate
     * @returns  Returns the new negated function.
     */
    negate: function negate(func) {
        return function (...ary) {
            return !func(...ary)
        }
    },
    /**
     * Creates a function that accepts up to one argument, 
     * ignoring any additional arguments.
     * 
     * @param {any} func The function to cap arguments for.
     * @returns Returns the new capped function.
     */
    unary: function unary(func) {
        return function (ary) {
            return func(ary)
        }
    },
    /**
     * Creates a function that invokes func, with up to n arguments, 
     * ignoring any additional arguments.
     * 
     * @param {any} func The function to cap arguments for.
     * @param {any} [n=func.length] The arity cap.
     * @returns Returns the new capped function.
     */
    ary: function ary(func, n = func.length) {
        return function (...args) {
            if (n < args.length) {
                args.length = n
            }
            return func(...args)
        }
    },
}